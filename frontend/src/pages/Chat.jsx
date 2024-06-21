// Chat.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const Chat = () => {
  const { modelName } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendMessage = () => {
    axios.post(`http://localhost:5000/single_chat`, { model_name: modelName, message })
      .then(response => {
        console.log('Chat response:', response.data);
        setMessage(''); // Clear message input after sending
      })
      .catch(error => {
        console.error('Error initiating chat:', error);
        setError('Failed to send message. Please try again.');
      });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Chat with {modelName}</Typography>
      <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
        {/* Display chat history here */}
      </Box>
      <TextField
        fullWidth
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSendMessage}>Send</Button>
      {error && (
        <Typography variant="subtitle2" color="error">{error}</Typography>
      )}
    </Box>
  );
};

export default Chat;
