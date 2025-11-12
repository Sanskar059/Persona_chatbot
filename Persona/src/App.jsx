import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAsk = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: message,
      });
      setMessages([
        ...messages,
        { text: message, sender: 'user', timestamp: new Date().toLocaleTimeString() },
        { text: res.data.response, sender: 'system', timestamp: new Date().toLocaleTimeString() }
      ]);
      setMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...messages,
        { text: message, sender: 'user', timestamp: new Date().toLocaleTimeString() },
        { text: "Sorry, there was an error processing your request.", sender: 'system', timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Alakh Pandey Chat</h1>
      </div>

      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${msg.sender === 'user' ? 'user-message-wrapper' : 'system-message-wrapper'}`}
            >
              <div className={`message ${msg.sender === 'user' ? 'user-message' : 'system-message'}`}>
                <div className="message-content">{msg.text}</div>
                <div className="message-timestamp">{msg.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask something to Alakh Sir..."
            disabled={loading}
          />
          <button onClick={handleAsk} disabled={loading}>
            {loading ? "Sending..." : "Ask"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
