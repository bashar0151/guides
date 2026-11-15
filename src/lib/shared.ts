import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Bashar Wiki';
export const docsRoute = '/';
export const docsImageRoute = '/og/docs';

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'bashar0151',
  repo: 'guides',
  branch: 'main',
};

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
