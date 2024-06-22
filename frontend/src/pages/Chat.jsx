import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ReactMarkdown from 'react-markdown';
import './Chat.css'; // Import the CSS file

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

    axios
      .post(`http://localhost:5000/single_chat/${modelName.toLowerCase()}`, { message })
      .then((response) => {
        console.log('Chat response:', response.data);
        const newMessage = {
          userMessage: message,
          modelResponse: response.data.responses,
        };
        setChatHistory((prev) => [...prev, newMessage]); // Update chat history with user message and model response
        setMessage(''); // Clear message input after sending
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again.');
      });
  };

  return (
    <div className='single'>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: 'center',
          paddingTop: '30px',
          fontFamily: 'Manrope',
          fontWeight: '400',
          color: 'white',
        }}
      >
        Chat with {modelName}
      </Typography>

      {/* Chat history */}
      <Box
        className="chat-history"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginTop: '20px',
          gap: '20px',
          width: '60%',
          marginLeft: '20%',
        }}
      >
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
            {/* Model response */}
            <Box
              sx={{
                borderRadius: '24px',
                background:
                  'linear-gradient(0deg, #7F7F7F 0%, #7F7F7F 100%), rgba(57, 56, 56, 0.50)',
                mixBlendMode: 'color-dodge',
                width: '80%',
                padding: '15px',
                fontFamily: 'Manrope',
                color: 'white',
              }}
            >
              <ReactMarkdown>{messageData.modelResponse}</ReactMarkdown>
            </Box>
          </React.Fragment>
        ))}
      </Box>

      {/* Message input and send button */}
      <Box className="chat-container" sx={{ display: 'flex', marginLeft: '19%' }}>
        <TextField
          fullWidth
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
            marginTop: '60px', width:"920px"
          }}
        />
        <Button
          
          className="send-button"
          onClick={handleSendMessage}
          sx={{ bgcolor: 'transparent', marginLeft: '-80px', marginTop: '67px',color:"white"}}
        >
          <SendIcon />
        </Button>
        {error && (
          <Typography variant="subtitle2" color="error" className="error-message">
            {error}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default Chat;
