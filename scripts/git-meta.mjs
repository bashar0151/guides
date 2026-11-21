// Builds two things from git history, right before `next dev` / `next build`:
//   1. src/generated/page-dates.json  ->  { "eclipse/addons.mdx": "2026-11-21T00:41:00+00:00", ... }
//   2. content/docs/changelog.mdx     ->  a "Changelog" page built from recent commits
// If git is unavailable (or the history is shallow), it writes empty output and never fails the build.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const CONTENT_DIR = process.env.CONTENT_DIR || 'content/docs';
const DATES_FILE = process.env.DATES_FILE || 'src/generated/page-dates.json';
const CHANGELOG_FILE = join(CONTENT_DIR, 'changelog.mdx');
const MAX_COMMITS = 60;
const MAX_FILES_PER_ENTRY = 6;
// Commits starting with these words, or containing [skip changelog], are left out of the changelog.
const SKIP = /^(chore|dev|ci|build|merge|wip)\b|\[skip changelog\]/i;

const RS = '\x1e';
const US = '\x1f';

function readHistory() {
  try {
    const out = execFileSync(
      'git',
      ['-c', 'safe.directory=*', 'log', '--no-merges', `--format=${RS}%H${US}%cI${US}%s`, '--name-only', '--', CONTENT_DIR],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] },
    );
    return out
      .split(RS)
      .filter(Boolean)
      .map((record) => {
        const [header, ...rest] = record.split('\n');
        const [hash, date, subject] = header.split(US);
        const files = rest
          .map((f) => f.trim())
          .filter((f) => f.startsWith(`${CONTENT_DIR}/`))
          .map((f) => f.slice(CONTENT_DIR.length + 1));
        return { hash, date, subject, files };
      });
  } catch {
    console.warn('[git-meta] git history not available; skipping dates and changelog');
    return [];
  }
}

const isPage = (f) => /\.mdx?$/.test(f) && f !== 'changelog.mdx';

function pageUrl(file) {
  const noExt = file.replace(/\.mdx?$/, '');
  if (noExt === 'index') return '/';
  return '/' + noExt.replace(/\/index$/, '');
}

function pageTitle(file) {
  try {
    const text = readFileSync(join(CONTENT_DIR, file), 'utf8');
    const m = text.match(/^title:\s*["']?(.+?)["']?\s*$/m);
    if (m) return m[1];
  } catch {}
  return null;
}

const escapeMdx = (s) => s.replace(/[\\<>{}\[\]`*_|]/g, (c) => `\\${c}`);

const fmtDay = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

const history = readHistory();

// 1. Last-edited date per page (history is newest first, so the first sighting wins)
const pageDates = {};
for (const c of history) {
  for (const f of c.files) {
    if (isPage(f) && !(f in pageDates)) pageDates[f] = c.date;
  }
}
mkdirSync(dirname(DATES_FILE), { recursive: true });
writeFileSync(DATES_FILE, JSON.stringify(pageDates, null, 2) + '\n');

// 2. Changelog page
const entries = history
  .filter((c) => !SKIP.test(c.subject) && c.files.some(isPage))
  .slice(0, MAX_COMMITS);

const byDay = new Map();
for (const c of entries) {
  const day = fmtDay(c.date);
  if (!byDay.has(day)) byDay.set(day, []);
  byDay.get(day).push(c);
}

let md = `---
title: "Changelog"
description: "Recent changes to this wiki, generated from its edit history."
---

Recent updates to the guides, newest first. Spotted something wrong or missing? See the [feedback page](/feedback).
`;

if (entries.length === 0) {
  md += '\nNo recorded changes yet.\n';
}

for (const [day, commits] of byDay) {
  md += `\n## ${day}\n\n`;
  for (const c of commits) {
    const pages = [...new Set(c.files.filter(isPage))].filter((f) => existsSync(join(CONTENT_DIR, f)));
    const shown = pages.slice(0, MAX_FILES_PER_ENTRY).map((f) => {
      const title = pageTitle(f) || f.replace(/\.mdx?$/, '');
      return `[${escapeMdx(title)}](${pageUrl(f)})`;
    });
    const more = pages.length > MAX_FILES_PER_ENTRY ? `, +${pages.length - MAX_FILES_PER_ENTRY} more` : '';
    md += `- **${escapeMdx(c.subject)}**${shown.length ? ` — ${shown.join(', ')}${more}` : ''}\n`;
  }
}

writeFileSync(CHANGELOG_FILE, md);
console.log(`[git-meta] ${Object.keys(pageDates).length} page dates, ${entries.length} changelog entries`);
