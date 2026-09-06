'use client';

import { useEffect, useState } from 'react';

const TZ = 'America/Sao_Paulo';

function format(d: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: TZ,
  }).format(d);
}

/** Local time in Belo Horizonte. Renders a placeholder until mounted to avoid hydration mismatch. */
export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? '--:--'}
    </span>
  );
}
