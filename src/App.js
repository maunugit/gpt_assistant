import React, { useState } from 'react';
import { sendMessage } from './apiService'; // Importing the API service
import Message from './Message'; // Assuming you have a Message component
import InputBar from './InputBar'; // Assuming you have an InputBar component
import './ChatApp.css'; // Make sure you create this CSS file and define styles

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
      author: 'user'
    };

    setMessages(messages => [...messages, userMessage]); // Add user message to chat
    setUserInput(''); // Clearing the input field
    setIsAiTyping(true);

    try {
      const aiResponse = await sendMessage(userInput); // Sending message to API
      const aiMessage = {
        text: aiResponse.reply, // Get AI response
        author: 'ai'
      };
      setMessages(messages => [...messages, aiMessage]); // Add AI response to chat
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsAiTyping(false); // AI stops typing after response or error
  };

  return (
    <div className="ChatApp">
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} author={message.author} />
        ))}
        {isAiTyping && <div className="ai-typing">AI is typing...</div>}
      </div>
      <InputBar 
        userInput={userInput} 
        onInputChange={handleInputChange} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}

export default ChatApp;
