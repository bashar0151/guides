'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export default function AIChat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const busy = status === 'submitted' || status === 'streaming';

  return (
    <div className="flex flex-col h-[350px] border rounded-lg p-4 bg-background my-6 shadow-sm">
      <div className="text-sm font-semibold mb-2">Ask AI about this wiki</div>
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-2">
        {messages.length === 0 && (
          <p className="text-muted-foreground text-sm italic">
            Ask a question to start chatting with DeepSeek...
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`text-sm whitespace-pre-wrap ${
              m.role === 'user'
                ? 'text-blue-600 dark:text-blue-400 font-medium'
                : 'text-foreground'
            }`}
          >
            <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
            {m.parts.map((part, i) =>
              part.type === 'text' ? <span key={i}>{part.text}</span> : null,
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim() || busy) return;
          sendMessage({ text: input });
          setInput('');
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 border rounded px-3 py-1.5 text-sm bg-background"
        />
        <button
          type="submit"
          disabled={busy}
          className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-medium disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
