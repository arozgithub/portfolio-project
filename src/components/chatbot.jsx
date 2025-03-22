import React, { useState, useEffect } from "react"; 
import { Send, X, MessageCircle } from "lucide-react";
import "./chatbot.css";

const Chatbot = ({ conversationHistory }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I assist with your resume?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // On mount (or when conversationHistory changes), call the resume API endpoint
  useEffect(() => {
    if (conversationHistory && conversationHistory.trim().length > 0) {
      const callResumeAPI = async () => {
        try {
          const response = await fetch("http://localhost:8000/ai_resume/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ conversation_history: conversationHistory }),
          });
          const data = await response.json();
          if (data.resume) {
            setMessages(prev => [...prev, { text: data.resume, sender: "bot" }]);
          } else {
            setMessages(prev => [...prev, { text: "⚠️ Error processing resume", sender: "bot" }]);
          }
        } catch (error) {
          console.error("Error calling ai_resume:", error);
          setMessages(prev => [...prev, { text: "⚠️ Error calling resume API", sender: "bot" }]);
        }
      };
      callResumeAPI();
    }
  }, [conversationHistory]);

  // Function to send follow-up questions using the ai_followup endpoint
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    try {
      const response = await fetch("http://localhost:8000/ai_followup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_history: input }),
      });
      const data = await response.json();
      if (data.follow_up_question) {
         setMessages(prev => [...prev, { text: data.follow_up_question, sender: "bot" }]);
      } else {
         setMessages(prev => [...prev, { text: "⚠️ Error generating follow-up", sender: "bot" }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { text: "⚠️ Error contacting follow-up endpoint", sender: "bot" }]);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>AI Resume Assistant</span>
            <X className="close-btn" onClick={() => setIsOpen(false)} />
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Enter resume related questions"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="chatbot-icon" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
