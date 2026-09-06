import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          borderRadius: '6px',
          border: '1px solid #3a3a3a',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#e8e8e8',
            letterSpacing: '-0.5px',
            fontFamily: 'monospace',
          }}
        >
          LS
        </span>
      </div>
    ),
    { ...size }
  );
}
