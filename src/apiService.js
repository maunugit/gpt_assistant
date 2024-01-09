import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000' // Flask API URL
});

export const sendMessage = async (message) => {
    try {
        const response = await api.post('/message', { message }); // endpoint for the message that is sent
        return response.data;
    } catch (error) {
        console.error('Error sending message to API:', error);
        throw error;
    }
};