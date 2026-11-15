import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';

// Docs live at the site root, so there is no URL prefix here.
const { rewrite: rewriteDocs } = rewritePath('{/*path}', '/llms.mdx{/*path}.md');
const skip = /^\/(api|_next|og|llms)/;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // files like `/page.md` are served by the rewrites of the Next.js config
  const result =
    isMarkdownPreferred(request) &&
    !skip.test(pathname) &&
    !/\.(md|txt)$/.test(pathname) &&
    rewriteDocs(pathname);

  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl), {
      // this URL has two representations, selected by `Accept`
      headers: { Vary: 'Accept' },
    });
  }

  return NextResponse.next();
}
