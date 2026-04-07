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
          background: '#070b14',
          borderRadius: '6px',
          border: '1px solid rgba(0,212,255,0.3)',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: '#00d4ff',
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
