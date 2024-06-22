import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './GroupChat.css'; // Import the CSS file

const GroupChat = () => {
  const { modelNames } = useParams(); // Extract modelNames from route parameters
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === '') {
      setError('Message cannot be empty.');
      return;
    }

    axios
      .post('http://localhost:5000/group_chat', {
        model_names: modelNames.split(',').map(name => name.toLowerCase().trim()),
        message,
      })
      .then(response => {
        console.log('Group chat response:', response.data);
        const newMessage = {
          userMessage: message,
          modelResponses: response.data.responses,
        };
        setChatHistory([...chatHistory, newMessage]);
        setMessage(''); // Clear message input after sending
      })
      .catch(error => {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again.');
      });
  };
  const formatModelNameForDisplay = (name) => {
    return name.replace(/_/g, ' '); // Replace underscores with spaces
  };

  return (
    <div className="single">
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', paddingTop: '20px', fontFamily: 'Manrope', fontWeight: '400', color: 'white' }}>
        Group Chat with {formatModelNameForDisplay(modelNames.replace(',', ', '))}
      </Typography>
      
      {/* Chat history */}
      <Box className="chat-history" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '20px', gap: '20px', width: '60%', marginLeft: '20%' }}>
        {chatHistory.map((messageData, index) => (
          <React.Fragment key={index}>
            {/* User message */}
            <Box
              sx={{
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '10px',
                maxWidth: '70%',
                alignSelf: 'flex-end',
              }}
            >
              <Typography variant="body1">{messageData.userMessage}</Typography>
            </Box>
            <AccountCircleIcon sx={{ color: 'white', marginLeft: '10px' }} />
            {/* Model responses */}
            {messageData.modelResponses.map((response, idx) => (
              <Box
                key={idx}
                sx={{
                  borderRadius: '24px',
                  background: 'linear-gradient(0deg, #7F7F7F 0%, #7F7F7F 100%), rgba(57, 56, 56, 0.50)',
                  mixBlendMode: 'color-dodge',
                  width: '100%',
                  padding: '15px',
                  fontFamily: 'Manrope',
                  color: 'white',
                }}
              >
                <Typography variant="body1">{response}</Typography>
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Box>

      {/* Message input and send button */}
      <Box className="chat-container" sx={{ display: 'flex', marginLeft: '20%' }}>
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
              borderColor: 'orange',
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
            marginTop: '20px',
          }}
        />
        <Button
          
          className="send-button"
          onClick={handleSendMessage}
          sx={{ bgcolor: 'black', marginLeft: '-80px', marginTop: '27px',color:"white" }}
        >
          <SendIcon />
        </Button>
        {error && <Typography variant="subtitle2" color="error" className="error-message">{error}</Typography>}
      </Box>
    </div>
  );
};

export default GroupChat;
