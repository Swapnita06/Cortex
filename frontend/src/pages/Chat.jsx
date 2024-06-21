import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import './Chat.css';  // Import the CSS file

const Chat = () => {
  const { modelName } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === '') {
      setError('Message cannot be empty.');
      return;
    }

    axios.post(`http://localhost:5000/single_chat/${modelName.toLowerCase()}`, { message })
      .then(response => {
        console.log('Chat response:', response.data);
        setChatHistory(prev => [...prev, response.data.responses]); // Update chat history with new message
        setMessage(''); // Clear message input after sending
      })
      .catch(error => {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again.');
      });
  };

  return (
    <Box className="chat-container">
      <Typography variant="h4" gutterBottom>Chat with {modelName}</Typography>
      <Box className="chat-history">
        {chatHistory.map((msg, index) => (
          <Typography key={index} variant="body1" className="chat-message">{msg}</Typography>
        ))}
      </Box>
      <TextField
        fullWidth
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="chat-input"
      />
      <Button variant="contained" className="send-button" onClick={handleSendMessage}>Send</Button>
      {error && (
        <Typography variant="subtitle2" color="error" className="error-message">{error}</Typography>
      )}
    </Box>
  );
};

export default Chat;
