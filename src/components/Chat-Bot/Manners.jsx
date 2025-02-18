"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function Manners() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(1);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  const sendMessage = (role, content) => {
    setMessages((prev) => [...prev, { id: prev.length + 1, role, content }]);
  };

  const handleSelection = (option) => {
    if (step === 1) {
      sendMessage("user", option);
      setStep(2);
      sendMessage("bot", "Great! Please enter your first and last name.");
    } else if (step === 3) {
      sendMessage("user", option);
      sendMessage("bot", getServiceInfo(option));
      setStep(4);
    } else if (step === 4 && option === "Yes") {
      router.push("/contact-us");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage("user", input);
    
    if (step === 2) {
      sendMessage("bot", `Welcome, ${input}! How can we assist you today?`);
      setStep(3);
    }
    setInput("");
  };

  const getServiceInfo = (service) => {
    const info = {
      "Personal Grooming & Etiquette": "We help individuals refine their personal grooming and social skills.",
      "Corporate & Business Etiquette": "Enhance your professional image and workplace communication.",
      "Children & Teen Etiquette": "We offer fun and engaging programs for kids and teens.",
      "Workshops & Training Programs": "Join our tailored training programs for various etiquette needs.",
      "Custom Consultation": "Get a personalized consultation for your specific needs."
    };
    return info[service] || "How can we assist you further?";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fixed bottom-4 right-4 z-50 w-auto">
      {!showChat ? (
        <Button onClick={() => setShowChat(true)} className="rounded-full p-4">Start Chat</Button>
      ) : (
        <Card className="w-96 relative">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Chat with Modern Mannerism</CardTitle>
            <Button onClick={() => setShowChat(false)} className="p-2 absolute top-0 right-0" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto mb-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>{msg.content}</span>
                </div>
              ))}
            </div>
            
            {step === 1 && (
              <div className="flex flex-wrap gap-2">
                {["Mr.", "Miss", "Mrs.", "Other"].map((title) => (
                  <Button key={title} onClick={() => handleSelection(title)}>{title}</Button>
                ))}
              </div>
            )}
            
            {step === 2 && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your name..." />
                <Button type="submit"><Send className="h-4 w-4" /></Button>
              </form>
            )}
            
            {step === 3 && (
              <div className="flex flex-wrap gap-2">
                {["Personal Grooming & Etiquette", "Corporate & Business Etiquette", "Children & Teen Etiquette", "Workshops & Training Programs", "Custom Consultation"].map((service) => (
                  <Button key={service} onClick={() => handleSelection(service)}>{service}</Button>
                ))}
              </div>
            )}
            
            {step === 4 && (
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => handleSelection("Yes")} className="bg-green-500">Yes, I'm Interested</Button>
                <Button onClick={() => handleSelection("No")} className="bg-red-500">No, Thanks</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
