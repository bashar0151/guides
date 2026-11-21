'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  getAutoSeasonalTheme,
  SEASONAL_THEMES,
  type ActiveSeasonalTheme,
  type SeasonalThemeId,
} from '@/lib/seasonal-themes';

const STORAGE_KEY = 'wiki-seasonal-theme';

interface SeasonalContextValue {
  preference: SeasonalThemeId;
  setPreference: (next: SeasonalThemeId) => void;
  activeTheme: ActiveSeasonalTheme;
}

const SeasonalContext = createContext<SeasonalContextValue | null>(null);

export function SeasonalThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<SeasonalThemeId>('auto');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as SeasonalThemeId | null;
    if (saved && (saved === 'auto' || saved === 'off' || saved in SEASONAL_THEMES)) {
      setPreferenceState(saved);
    }
  }, []);

  const setPreference = (next: SeasonalThemeId) => {
    setPreferenceState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const activeTheme: ActiveSeasonalTheme = useMemo(() => {
    if (preference === 'off') return null;
    if (preference === 'auto') return getAutoSeasonalTheme();
    return preference;
  }, [preference]);

  return (
    <SeasonalContext.Provider value={{ preference, setPreference, activeTheme }}>
      {children}
      <SeasonalOverlay activeTheme={activeTheme} />
    </SeasonalContext.Provider>
  );
}

function SeasonalOverlay({ activeTheme }: { activeTheme: ActiveSeasonalTheme }) {
  const particles = useMemo(() => {
    if (!activeTheme) return [];
    const config = SEASONAL_THEMES[activeTheme];
    return Array.from({ length: config.particleCount }, (_, i) => {
      const left = (i * 37) % 100;
      const delay = ((i * 0.73) % 8).toFixed(2);
      const duration = (7 + (i % 6) * 1.4).toFixed(2);
      const size = 4 + (i % 5) * 2;
      return { id: i, left, delay, duration, size, shape: config.particleShape };
    });
  }, [activeTheme]);

  if (!activeTheme) return null;

  const isRising = activeTheme === 'bonfire-night' || activeTheme === 'halloween';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none"
    >
      {particles.map((p) => {
        let colorClass = 'bg-white/85 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.65)]';
        if (p.shape === 'spark') {
          colorClass =
            p.id % 2 === 0
              ? 'bg-amber-400/90 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.85)]'
              : 'bg-orange-500/90 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.85)]';
        } else if (p.shape === 'ember') {
          colorClass =
            p.id % 2 === 0
              ? 'bg-orange-500/80 rounded-full shadow-[0_0_6px_rgba(249,115,22,0.7)]'
              : 'bg-purple-400/70 rounded-full shadow-[0_0_6px_rgba(192,132,252,0.6)]';
        } else if (p.shape === 'confetti') {
          const palette = [
            'bg-amber-300/90 rounded-xs',
            'bg-sky-300/90 rounded-xs',
            'bg-rose-300/90 rounded-xs',
          ];
          colorClass = palette[p.id % palette.length];
        }

        return (
          <span
            key={p.id}
            className={`seasonal-particle absolute ${colorClass}`}
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `${isRising ? 'seasonal-rise' : 'seasonal-fall'} ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export function SeasonalHeaderSwitcher() {
  const ctx = useContext(SeasonalContext);
  if (!ctx) return null;

  const { preference, setPreference, activeTheme } = ctx;
  const activeConfig = activeTheme ? SEASONAL_THEMES[activeTheme] : null;

  return (
    <div className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-secondary/60 px-2 py-1 text-xs text-fd-foreground">
      <span aria-hidden="true">{activeConfig ? activeConfig.icon : '🌿'}</span>
      <select
        value={preference}
        onChange={(e) => setPreference(e.target.value as SeasonalThemeId)}
        aria-label="Holiday theme"
        title="Switch holiday theme"
        className="bg-transparent text-xs font-medium text-fd-foreground focus:outline-none cursor-pointer"
      >
        <option value="auto" className="bg-fd-background text-fd-foreground">
          Auto ({activeConfig ? activeConfig.label : 'Off'})
        </option>
        <option value="christmas" className="bg-fd-background text-fd-foreground">
          Christmas
        </option>
        <option value="new-year" className="bg-fd-background text-fd-foreground">
          New Year
        </option>
        <option value="halloween" className="bg-fd-background text-fd-foreground">
          Halloween
        </option>
        <option value="bonfire-night" className="bg-fd-background text-fd-foreground">
          Bonfire Night
        </option>
        <option value="off" className="bg-fd-background text-fd-foreground">
          Off
        </option>
      </select>
    </div>
  );
}