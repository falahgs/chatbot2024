import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleGenerativeAIStream, StreamingTextResponse } from '@ai-sdk/google-generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

export async function POST(req: Request) {
  const { messages } = await req.json()
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const chat = model.startChat({
    history: messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: m.content,
    })),
  })

  const result = await chat.sendMessageStream(messages[messages.length - 1].content)

  const stream = GoogleGenerativeAIStream(result)

  return new StreamingTextResponse(stream)
}
