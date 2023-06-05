import { chatbotPrompt } from "@/constants/chatbot-prompt";
import { OpenAIStream, OpenAIStreamPayload } from "../../../libs/openAIStream";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}
export const dynamic = 'auto';

export async function POST(req: Request): Promise<Response> {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }


  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }, { role: "system", content: chatbotPrompt }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')

  return new NextResponse(null, {
      status: 204,
      headers: {
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
  })
}