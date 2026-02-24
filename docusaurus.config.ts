import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Debrid Vault Guides',
  tagline: 'Master your media library',
  favicon: 'img/favicon.ico',

  // Updated to your new domain
  url: 'https://bashar.wiki',
  baseUrl: '/',

  // These prevent the Docker build from failing on minor link/image errors
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    format: 'mdx',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  future: {
    v4: true, 

  },

  organizationName: 'bashar', 
  projectName: 'dv-guides', 

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/bashar/aio-guides/tree/main/',
          routeBasePath: '/',
          showLastUpdateAuthor: true, 
          showLastUpdateTime: true,
        },
        // Blog is now disabled
        blog: false, 
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Bashar Wiki',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Home',
        },
        {
          href: 'https://github.com/bashar0151/guides',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      appId: '7901PBJMTW',
      apiKey: '7cd0f4b6f2490523e353a61c02048866',
      indexName: 'wiki',
      contextualSearch: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Setup Guide',
              to: '/debrid-vault/setup-guide',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/A8j4c42sdY',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Debread Vault',
              href: 'https://debridvault.elfhosted.com/',
            },
            {
              label: 'YT Music Playlist converter tool',
              href: 'https://yt.bashar.wiki/',
            },
            {
              label: 'Status',
              href: 'https://status.bashar.wiki/status/dves',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bashar Wiki. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;