import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Goon — Describe your offer. Get a landing page.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050507',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Grid pattern background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            backgroundImage:
              'linear-gradient(rgba(79,70,229,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient accent line */}
        <div
          style={{
            width: '200px',
            height: '3px',
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4, #14b8a6)',
            borderRadius: '2px',
            marginBottom: '40px',
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 600,
            fontFamily: 'system-ui, sans-serif',
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4, #14b8a6)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '40px',
            letterSpacing: '-0.02em',
          }}
        >
          Goon
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 700,
            fontFamily: 'system-ui, sans-serif',
            color: '#f4f4f5',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}
        >
          Describe your offer.{'\n'}Get a landing page.
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: '20px',
            fontFamily: 'system-ui, sans-serif',
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          One paragraph → polished, conversion-tested landing page in under a minute.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
