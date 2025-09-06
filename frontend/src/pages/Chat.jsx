import React, { useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setIsTyping(false);
      setMessages([...newMessages, { sender: "bot", text: data.response }]);
    } catch (error) {
      setIsTyping(false);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Error connecting to server" },
      ]);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0px 4px 16px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        height: "600px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #457b9d, #1d3557)",
          padding: "15px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          color: "white",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        💬 HealthCareBot Chat
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          background: "#f1faee",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                background: msg.sender === "user" ? "#457b9d" : "#a8dadc",
                color: msg.sender === "user" ? "white" : "#1d3557",
                padding: "12px 16px",
                borderRadius: "20px",
                maxWidth: "70%",
                fontSize: "15px",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ color: "#1d3557", fontStyle: "italic" }}>
            Bot is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          padding: "12px",
          borderTop: "1px solid #ddd",
          background: "#fff",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // avoid form submission
              sendMessage();
            }
          }}
          placeholder="Ask me about health, fitness, or wellness..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "12px 24px",
            background: "#e63946",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
