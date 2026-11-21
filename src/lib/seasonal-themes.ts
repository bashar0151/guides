export type SeasonalThemeId =
  | 'auto'
  | 'off'
  | 'christmas'
  | 'new-year'
  | 'halloween'
  | 'bonfire-night';

export type ActiveSeasonalTheme = Exclude<SeasonalThemeId, 'auto' | 'off'> | null;

export interface SeasonalThemeConfig {
  id: Exclude<SeasonalThemeId, 'auto' | 'off'>;
  label: string;
  icon: string;
  particleShape: 'snow' | 'spark' | 'ember' | 'confetti';
  particleCount: number;
}

export const SEASONAL_THEMES: Record<
  Exclude<SeasonalThemeId, 'auto' | 'off'>,
  SeasonalThemeConfig
> = {
  christmas: {
    id: 'christmas',
    label: 'Christmas',
    icon: '❄️',
    particleShape: 'snow',
    particleCount: 38,
  },
  'new-year': {
    id: 'new-year',
    label: 'New Year',
    icon: '✨',
    particleShape: 'confetti',
    particleCount: 34,
  },
  halloween: {
    id: 'halloween',
    label: 'Halloween',
    icon: '🎃',
    particleShape: 'ember',
    particleCount: 28,
  },
  'bonfire-night': {
    id: 'bonfire-night',
    label: 'Bonfire Night (5 Nov)',
    icon: '🔥',
    particleShape: 'spark',
    particleCount: 32,
  },
};

export function getAutoSeasonalTheme(date = new Date()): ActiveSeasonalTheme {
  const month = date.getMonth() + 1; // 1–12
  const day = date.getDate();

  // New Year window: Dec 30 – Jan 4
  if ((month === 12 && day >= 30) || (month === 1 && day <= 4)) {
    return 'new-year';
  }

  // Christmas / Festive window: Nov 15 – Dec 29
  if ((month === 11 && day >= 15) || (month === 12 && day <= 29)) {
    return 'christmas';
  }

  // Bonfire Night window: Nov 1 – Nov 8
  if (month === 11 && day >= 1 && day <= 8) {
    return 'bonfire-night';
  }

  // Halloween window: Oct 20 – Oct 31
  if (month === 10 && day >= 20) {
    return 'halloween';
  }

  return null;
}