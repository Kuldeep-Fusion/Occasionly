import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Wish from '@/models/Wish';

export async function GET() {
  try {
    const { isConnected, fallback } = await connectToDatabase();

    if (isConnected) {
      const wishes = await Wish.find({}).sort({ createdAt: -1 });
      return NextResponse.json({
        success: true,
        source: 'mongodb',
        count: wishes.length,
        data: wishes,
      });
    }

    return NextResponse.json({
      success: true,
      source: 'memory',
      count: fallback.wishes.length,
      data: fallback.wishes,
    });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message, emoji } = body;

    if (!name || !name.trim() || !message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name and message are required.' },
        { status: 400 }
      );
    }

    const { isConnected, fallback } = await connectToDatabase();

    if (isConnected) {
      const newWish = await Wish.create({
        name: name.trim(),
        message: message.trim(),
        emoji: emoji || '❤️',
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Wish added to the guestbook!',
          source: 'mongodb',
          data: newWish,
        },
        { status: 201 }
      );
    }

    const fallbackWish = {
      _id: 'wish-' + Date.now(),
      name: name.trim(),
      message: message.trim(),
      emoji: emoji || '❤️',
      createdAt: new Date().toISOString(),
    };

    fallback.wishes.unshift(fallbackWish);

    return NextResponse.json(
      {
        success: true,
        message: 'Wish added to the guestbook (saved)!',
        source: 'memory',
        data: fallbackWish,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding wish:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
