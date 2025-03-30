import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o"),
    system:
      "You are a helpful chat assistant for a live streaming platform. Be friendly and engaging. Keep responses brief and relevant to the streaming context.",
    messages,
  })

  return result.toDataStreamResponse()
}

