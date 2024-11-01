'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isTyping, setIsTyping] = useState(false)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsTyping(true)
    handleSubmit(e).finally(() => setIsTyping(false))
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Gemini Chatbot</h1>
        </div>
      </header>
      <main className="flex-grow overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-lg ${
                m.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-white'
              } max-w-sm`}
            >
              {m.content}
            </div>
          ))}
          {isTyping && (
            <div className="p-4 rounded-lg bg-white max-w-sm">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-white shadow">
        <div className="max-w-3xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleFormSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send
            </button>
          </form>
        </div>
      </footer>
    </div>
  )
}
