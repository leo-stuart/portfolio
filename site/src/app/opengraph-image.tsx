import { ImageResponse } from 'next/og';
import { content } from '@/data/content';

export const alt = 'Leonardo Stuart — Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  const t = content.en;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0a0a0b',
          color: '#ececec',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, color: '#a3a3a3' }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: '#3fb950' }} />
          <span>{t.hero.name}</span>
          <span style={{ color: '#2e2e33' }}>·</span>
          <span>{t.hero.role}</span>
        </div>

        <div
          style={{
            fontSize: 64,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontWeight: 500,
            maxWidth: 980,
          }}
        >
          {t.hero.headline}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#666668',
            borderTop: '1px solid #1f1f22',
            paddingTop: 28,
          }}
        >
          <span>github.com/leo-stuart · linkedin.com/in/leonardo-stuart</span>
          <span style={{ color: '#e5a542' }}>allu. · Belo Horizonte</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
