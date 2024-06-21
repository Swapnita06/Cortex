// GroupChat.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const GroupChat = () => {
  const { modelNames } = useParams(); // Extract modelNames from route parameters
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === '') {
      setError('Message cannot be empty.');
      return;
    }

    axios.post('http://localhost:5000/group_chat', {
      model_names: modelNames.split(',').map(name => name.toLowerCase()),
      message
    })
      .then(response => {
        console.log('Group chat response:', response.data);
        setResponses([...responses, ...response.data.responses]);
        setMessage(''); // Clear message input after sending
      })
      .catch(error => {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again.');
      });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Group Chat with {modelNames.replace(',', ', ')}</Typography>
      <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2 }}>
        {responses.map((response, index) => (
          <Typography key={index} variant="body1">{response}</Typography>
        ))}
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

export default GroupChat;
