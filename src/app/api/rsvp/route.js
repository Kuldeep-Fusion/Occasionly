import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Rsvp from '@/models/Rsvp';

export async function GET() {
  try {
    const { isConnected, fallback } = await connectToDatabase();

    if (isConnected) {
      const rsvps = await Rsvp.find({}).sort({ createdAt: -1 });
      const totalAttending = rsvps
        .filter((r) => r.attending === 'attending')
        .reduce((sum, r) => sum + (r.guestsCount || 1), 0);

      return NextResponse.json({
        success: true,
        source: 'mongodb',
        count: rsvps.length,
        totalAttending,
        data: rsvps,
      });
    }

    // In-memory fallback
    const totalAttending = fallback.rsvps
      .filter((r) => r.attending === 'attending')
      .reduce((sum, r) => sum + (r.guestsCount || 1), 0);

    return NextResponse.json({
      success: true,
      source: 'memory',
      count: fallback.rsvps.length,
      totalAttending,
      data: fallback.rsvps,
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, attending, guestsCount, dietary, dietaryNotes, songRequest, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400 }
      );
    }

    const { isConnected, fallback } = await connectToDatabase();

    if (isConnected) {
      const newRsvp = await Rsvp.create({
        name: name.trim(),
        attending: attending || 'attending',
        guestsCount: Number(guestsCount) || 1,
        dietary: Array.isArray(dietary) ? dietary : [],
        dietaryNotes: dietaryNotes ? dietaryNotes.trim() : '',
        songRequest: songRequest ? songRequest.trim() : '',
        message: message ? message.trim() : '',
      });

      return NextResponse.json(
        {
          success: true,
          message: 'RSVP submitted successfully!',
          source: 'mongodb',
          data: newRsvp,
        },
        { status: 201 }
      );
    }

    // Fallback store
    const fallbackEntry = {
      _id: 'mock-' + Date.now(),
      name: name.trim(),
      attending: attending || 'attending',
      guestsCount: Number(guestsCount) || 1,
      dietary: Array.isArray(dietary) ? dietary : [],
      dietaryNotes: dietaryNotes ? dietaryNotes.trim() : '',
      songRequest: songRequest ? songRequest.trim() : '',
      message: message ? message.trim() : '',
      createdAt: new Date().toISOString(),
    };

    fallback.rsvps.unshift(fallbackEntry);

    return NextResponse.json(
      {
        success: true,
        message: 'RSVP submitted successfully (saved)!',
        source: 'memory',
        data: fallbackEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
