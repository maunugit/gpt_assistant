import React, { useState } from 'react';
import { sendMessage } from './apiService'; // Importing the API service
import './App.css';

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;
  
    const userMessage = {
      text: userInput,
      author: 'User'
    };
  
    setMessages(messages => [...messages, userMessage]); // Add user message to chat
    setUserInput(''); // Clearing the input field
    setIsAiTyping(true);
  
    try {
      const response = await sendMessage(userInput); // Sending message to API
      console.log('Response from server:', response); // Handling response
  
        const aiMessage = {
          text: response.reply, // Get AI response
          author: 'AI'
      
      };

      setMessages(messages => [...messages, aiMessage]); // Add AI response to chat
      setIsAiTyping(false); // AI stops typing 

    } catch (error) {
      console.error('Error sending message:', error);
      setIsAiTyping(false);
    }
  
    
  };
  

return (
  <div className="chat-app">
      <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.author}`}>
            <div className="message-content">{message.text}</div>
        </div>
    ))}
    {isAiTyping && <div className="ai-typing"> AI is typing...</div>}
</div>
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Type your message here..."
          />
          <button type="submit">Send</button>
      </form>
  </div>
);
}


export default ChatApp;
