"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, X } from "lucide-react" // Added X for close button
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Manners() {
  const [messages, setMessages] = useState([
    { id: 1, role: "bot", content: "Hello! What is your name?" },
  ])
  const [input, setInput] = useState("")
  const [showChat, setShowChat] = useState(false)

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // User message
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, role: "user", content: input },
      ])
    }

    // Automated response
    const nextBotMessage = getNextBotResponse(input)
    if (nextBotMessage) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 2, role: "bot", content: nextBotMessage },
      ])
    }

    setInput("")
  }

  const getNextBotResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes("hello")) {
      return "Nice to meet you! How can I help you today?"
    }
    if (userMessage.toLowerCase().includes("help")) {
      return "I'm here to assist you with your manners! Ask me anything."
    }
    return "I'm not sure how to respond to that. Could you ask me something else?"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50 w-auto"
    >
      {!showChat ? (
        <Button onClick={() => setShowChat(true)} className="rounded-full p-4">
          Start Chat
        </Button>
      ) : (
        <Card className="w-96 relative">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Chat with Manners</CardTitle>
            <Button
              onClick={() => setShowChat(false)}
              className="p-2 absolute top-0 right-0"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {message.content}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input value={input} onChange={handleInputChange} placeholder="Type your message..." />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
