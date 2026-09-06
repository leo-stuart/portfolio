'use client';

import { useEffect, useState } from 'react';

/** Returns the id of the section currently closest to the top of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const update = () => {
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      if (window.scrollY < 80) current = null;
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids]);

  return active;
}
