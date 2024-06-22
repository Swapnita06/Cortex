import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './GroupChat.css'; // Import the CSS file

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

    axios
      .post('http://localhost:5000/group_chat', {
        model_names: modelNames.split(',').map(name => name.toLowerCase()),
        message,
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
    <div className="single">
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', paddingTop: '20px', fontFamily: 'Manrope', fontWeight: '600' }}>
        Group Chat with {modelNames.replace(',', ', ')}
      </Typography>
      <Box className="chat-container" sx={{ display: 'flex', marginLeft: '20%' }}>
        <Box className="chat-history">
          {responses.map((response, index) => (
            <Typography key={index} variant="body1" className="chat-message">
              {response}
            </Typography>
          ))}
        </Box>
        <TextField
          fullWidth
          placeholder="Type your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="chat-input"
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'black',
              color: 'white',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'pink',
              borderRadius: '10px',
            },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'pink',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'pink',
            },
            '& .MuiInputLabel-root': {
              color: 'yellow',
            },
            '& .MuiInputLabel-shrink': {
              color: 'yellow',
            },
            '&::placeholder': {
              color: 'yellow',
            },
            marginTop: '590px',
          }}
        />
        <Button variant="contained" className="send-button" onClick={handleSendMessage} sx={{ bgcolor: 'black', marginLeft: '-80px', marginTop: '597px' }}>
          <SendIcon />
        </Button>
        {error && <Typography variant="subtitle2" color="error" className="error-message">{error}</Typography>}
      </Box>
    </div>
  );
};

export default GroupChat;
