import './globals.css';

export const metadata = {
  metadataBase: new URL('https://sahil-weds-anjali.wedding'),
  title: 'Sahil Weds Anjali | Wedding Invitation #SaAnj',
  description:
    'Solicit your gracious presence & blessings on the auspicious occasion of the wedding of Sahil & Anjali on 12th & 13th November 2026 at Omnia by Tivoli, Greater Noida West.',
  openGraph: {
    title: 'Sahil Weds Anjali | Wedding Invitation #SaAnj',
    description:
      'Solicit your gracious presence & blessings on the auspicious occasion of the wedding of Sahil & Anjali on 12th & 13th November 2026.',
    images: ['/canva_assets/7f25d4837f9c87457f8cff1daea7d9cd.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahil Weds Anjali | Wedding Invitation #SaAnj',
    description:
      'Solicit your gracious presence & blessings on the auspicious occasion of the wedding of Sahil & Anjali on 12th & 13th November 2026.',
    images: ['/canva_assets/7f25d4837f9c87457f8cff1daea7d9cd.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Berkshire+Swash&family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Kalam:wght@300;400;700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Rozha+One&family=Sedgwick+Ave&family=Yatra+One&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  );
}
