import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageImageUrl, gitConfig } from '@/lib/shared';
import { PageFeedback } from '@/components/feedback';
import pageDates from '@/generated/page-dates.json';

const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;
const dates = pageDates as Record<string, string>;

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = page.url === '/' ? '/index.md' : `${page.url}.md`;

  const filePath = `content/docs/${encodeURI(page.path)}`;
  const lastEdited = dates[page.path];
  const lastEditedLabel = lastEdited
    ? new Date(lastEdited).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null;
  // The changelog page is generated at build time, so it has no source file on GitHub.
  const isGenerated = page.path === 'changelog.mdx';
  const linkClass = 'underline underline-offset-2 hover:text-fd-foreground';

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`${repoUrl}/blob/${gitConfig.branch}/${filePath}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />

        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-sm text-fd-muted-foreground not-prose">
          {lastEditedLabel && !isGenerated && <span>Last edited {lastEditedLabel}</span>}
          {!isGenerated && (
            <>
              <a
                className={linkClass}
                href={`${repoUrl}/edit/${gitConfig.branch}/${filePath}`}
                target="_blank"
                rel="noreferrer"
              >
                Suggest an edit
              </a>
              <a
                className={linkClass}
                href={`${repoUrl}/commits/${gitConfig.branch}/${filePath}`}
                target="_blank"
                rel="noreferrer"
              >
                Page history
              </a>
            </>
          )}
          <Link className={linkClass} href="/feedback">
            Feedback
          </Link>
          {page.path !== 'changelog.mdx' && (
            <Link className={linkClass} href="/changelog">
              Changelog
            </Link>
          )}
        </div>
      </DocsBody>

      {/* Interactive Page Feedback Widget Component */}
      <PageFeedback
        title={page.data.title}
        githubUser={gitConfig.user}
        githubRepo={gitConfig.repo}
      />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
