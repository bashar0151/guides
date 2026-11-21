import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';

export const maxDuration = 30;

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openrouter.chat('deepseek/deepseek-v4.1-flash'),
    system:
      'You answer questions about the Eclipse music app and Debrid Vault using this wiki. ' +
      'If you are not sure of an answer, say so and point to the Discord (https://discord.gg/A2KrtxH653).',
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 600,
  });

  return result.toUIMessageStreamResponse();
}