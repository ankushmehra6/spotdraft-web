"use client"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import "./styles.scss"

// Simple SVG icons as components
const BotIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const UserIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const SendIcon = () => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setIsTyping(isLoading)
  }, [isLoading])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
    }
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <h1>
            <BotIcon />
            ChatGPT Clone
          </h1>
        </div>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        <div className="messages-content">
          {messages.length === 0 ? (
            <div className="empty-state">
              <BotIcon />
              <h2>How can I help you today?</h2>
              <p>Start a conversation by typing a message below.</p>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-row ${message.role === "user" ? "user-message" : "assistant-message"}`}
                >
                  {message.role === "assistant" && (
                    <div className="avatar bot-avatar">
                      <BotIcon />
                    </div>
                  )}

                  <div className={`message-bubble ${message.role === "user" ? "user-bubble" : "assistant-bubble"}`}>
                    <p>{message.content}</p>
                  </div>

                  {message.role === "user" && (
                    <div className="avatar user-avatar">
                      <UserIcon />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="typing-indicator">
                  <div className="avatar bot-avatar">
                    <BotIcon />
                  </div>
                  <div className="typing-bubble">
                    <div className="typing-content">
                      <div className="dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                      <span className="typing-text">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="input-section">
        <div className="input-content">
          <form onSubmit={onSubmit} className="input-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                disabled={isLoading}
                className="message-input"
              />
            </div>
            <button type="submit" disabled={isLoading || !input.trim()} className="send-button">
              <SendIcon />
            </button>
          </form>
          <p className="input-hint">Press Enter to send your message</p>
        </div>
      </div>
    </div>
  )
}
