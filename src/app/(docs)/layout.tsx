import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <DocsLayout 
      tree={source.getPageTree()} 
      {...baseOptions()}
      sidebar={{
        // Add a custom footer right at the bottom of the sidebar panel!
        footer: (
          <div className="p-2 border-t border-fd-border mt-auto">
            <a 
              href="https://ko-fi.com/bashar0151" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md bg-amber-500 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-amber-600 transition-colors w-full"
            >
              ☕ Buy Me a Coffee
            </a>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}