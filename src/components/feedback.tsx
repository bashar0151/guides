'use client';

import { useState } from 'react';

interface FeedbackProps {
  title: string;
  githubUser: string;
  githubRepo: string;
}

export function PageFeedback({ title, githubUser, githubRepo }: FeedbackProps) {
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (type: 'yes' | 'no') => {
    if (!hasVoted) {
      if (type === 'yes') setYesCount(c => c + 1);
      if (type === 'no') setNoCount(c => c + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-fd-border pt-6 gap-4 text-sm text-fd-muted-foreground">
      <p className="font-medium text-fd-foreground">Was this guide helpful?</p>
      <div className="flex gap-2">
        <a 
          href={`https://github.com/${githubUser}/${githubRepo}/discussions`} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => handleVote('yes')}
          className="inline-flex items-center gap-1.5 rounded-md border border-fd-border px-3 py-1.5 text-xs font-medium hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        >
          👍 Yes <span className="ml-1 rounded bg-fd-muted px-1.5 py-0.5 text-[10px]">{yesCount}</span>
        </a>
        <a 
          href={`https://github.com/${githubUser}/${githubRepo}/issues/new?title=Feedback on ${encodeURIComponent(title)}`} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => handleVote('no')}
          className="inline-flex items-center gap-1.5 rounded-md border border-fd-border px-3 py-1.5 text-xs font-medium hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        >
          👎 Needs Improvement <span className="ml-1 rounded bg-fd-muted px-1.5 py-0.5 text-[10px]">{noCount}</span>
        </a>
      </div>
    </div>
  );
}
