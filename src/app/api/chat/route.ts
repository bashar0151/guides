import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await generateText({
    model: openrouter('deepseek/deepseek-v4.1-flash'),
    messages,
  });

  return result.toDataStreamResponse();
}
