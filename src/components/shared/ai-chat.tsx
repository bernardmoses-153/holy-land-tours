"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import type { ChatMessage } from "@/types";

interface AIChatProps {
  title?: string;
  subtitle?: string;
  initialMessages?: ChatMessage[];
  suggestions?: string[];
  onSendMessage?: (message: string) => string; // returns mock response
  className?: string;
}

function TypingMessage({ content }: { content: string }) {
  const { displayed, isComplete } = useTypingAnimation(content, 15);
  return (
    <p className="text-sm text-body leading-relaxed whitespace-pre-wrap">
      {displayed}
      {!isComplete && <span className="inline-block w-0.5 h-4 bg-foreground animate-pulse-soft ml-0.5 align-text-bottom" />}
    </p>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-foreground text-background shrink-0">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="rounded-xl rounded-tl-sm bg-surface border border-border px-4 py-3">
        <div className="typing-dots flex gap-1.5">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export function AIChat({
  title = "AI Tour Guide",
  subtitle = "Ask me anything",
  initialMessages = [],
  suggestions = [],
  onSendMessage,
  className,
}: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastBotMessage, setLastBotMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = onSendMessage
        ? onSendMessage(messageText)
        : "That's a great question! I'd love to help you explore this topic further.";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };

      setIsTyping(false);
      setLastBotMessage(botMsg.id);
      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };

  return (
    <div className={cn("rounded-xl border border-border bg-background overflow-hidden flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-surface">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-foreground text-background">
          <Bot className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-medium text-foreground">{title}</h2>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
          <span className="text-xs text-muted">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
          >
            <div
              className={cn(
                "flex items-center justify-center h-7 w-7 rounded-full shrink-0",
                msg.role === "assistant"
                  ? "bg-foreground text-background"
                  : "bg-elevated text-secondary"
              )}
            >
              {msg.role === "assistant" ? (
                <Bot className="h-3.5 w-3.5" />
              ) : (
                <User className="h-3.5 w-3.5" />
              )}
            </div>
            <div
              className={cn(
                "rounded-xl px-4 py-3 max-w-[85%]",
                msg.role === "assistant"
                  ? "rounded-tl-sm bg-surface border border-border"
                  : "rounded-tr-sm bg-foreground text-background"
              )}
            >
              {msg.role === "assistant" && msg.id === lastBotMessage ? (
                <TypingMessage content={msg.content} />
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && messages.length <= initialMessages.length && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {suggestions.slice(0, 3).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSend(suggestion)}
              className="text-xs rounded-full border border-border px-3 py-1.5 text-secondary hover:bg-surface hover:border-border-hover transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-border-hover transition-colors"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex items-center justify-center h-10 w-10 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity shrink-0 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
