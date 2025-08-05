import { useState, useEffect, useRef } from "react";
import "./style.scss";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("https://2383644dfec4.ngrok-free.app/chat/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      const data = await res.json();

      const botMessage = {
        id: Date.now().toString() + "_bot",
        role: "assistant",
        content: data.answer || "Something went wrong.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatgpt-container">
      <div className="chatgpt-main">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <h1>How can I help you today?</h1>
            <p>Start a conversation below.</p>
          </div>
        ) : (
          <div className="chatgpt-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatgpt-message ${msg.role === "user" ? "user" : "bot"}`}
              >
                <div className="message-content">{msg.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className="chatgpt-message bot">
                <div className="message-content typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="chatgpt-input-form">
        <textarea
          ref={inputRef}
          className="chatgpt-input"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message ChatGPT..."
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="send-btn"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
