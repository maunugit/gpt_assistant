import React, { useState } from 'react';
import { sendMessage } from './apiService'; // Replace with the path to your service

const MessageSender = () => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendMessage(message);
            console.log('Response from server:', response);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send Message</button>
        </form>
    );
};

export default MessageSender;
