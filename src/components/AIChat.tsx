'use client';

import { useChat } from '@ai-sdk/react';

export default function AIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col h-[350px] border rounded-lg p-4 bg-background my-6 shadow-sm">
      <div className="text-sm font-semibold mb-2">Ask AI about this wiki</div>
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-2">
        {messages.length === 0 && (
          <p className="text-muted-foreground text-sm italic">Ask a question to start chatting with DeepSeek...</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`text-sm whitespace-pre-wrap ${m.role === 'user' ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-foreground'}`}>
            <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your question..."
          className="flex-1 border rounded px-3 py-1.5 text-sm bg-background"
        />
        <button type="submit" className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-medium">
          Send
        </button>
      </form>
    </div>
  );
}