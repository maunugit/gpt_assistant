// Message.js
import React from 'react';
import './Message.css'; 
const Message = ({ text, author }) => {
  const messageClass = author === 'user' ? 'message-user' : 'message-ai';
  return (
    <div className={`message ${messageClass}`}>{text}</div>
  );
};

export default Message;
