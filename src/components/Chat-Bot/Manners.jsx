"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Manners() {
  const [messages, setMessages] = useState([
    { id: 1, role: "bot", content: "Welcome to Modern Mannerism! How do we address you?\n🔘 Mr. \n🔘 Miss \n🔘 Mrs. \n🔘 Others (Specify)" },
  ]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: messages.length + 1, role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const botResponse = getNextBotResponse(input, step);
    if (botResponse) {
      setMessages((prev) => [...prev, { id: prev.length + 1, role: "bot", content: botResponse.text }]);
      setStep(botResponse.nextStep);
    }
    setInput("");
  };

  const getNextBotResponse = (userMessage, currentStep) => {
    switch (currentStep) {
      case 1:
        return { text: `Great! Please enter your first and last name.`, nextStep: 2 };
      case 2:
        return { text: `Nice to meet you, ${userMessage.split(" ").pop()}! How can we assist you today?\n⿡ Personal Grooming & Etiquette \n⿢ Corporate & Business Etiquette \n⿣ Children & Teen Etiquette \n⿤ Workshops & Training Programs \n⿥ Custom Consultation \n⿦ Other (Type your query)`, nextStep: 3 };
      case 3:
        return { text: `Would you like to book a consultation or get more details?\n🔘 Book a Session \n🔘 Speak to an Expert \n🔘 Download Our Free E-Book`, nextStep: 4 };
      default:
        return { text: "I'm not sure how to respond to that. Could you ask me something else?", nextStep: currentStep };
    }
  };

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
  );
}