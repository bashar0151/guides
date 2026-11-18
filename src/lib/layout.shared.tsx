import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      { text: 'Discord', url: 'https://discord.gg/A8j4c42sdY', external: true },
      { 
        text: '☕ Buy Me a Coffee', 
        url: 'https://ko-fi.com/bashar0151', 
        external: true,
      },
    ],
  };
}