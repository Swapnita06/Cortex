import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography,Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
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
    <div className='single'>
      <Typography variant="h4" gutterBottom style={{textAlign:"center",paddingTop:"20px",fontFamily:"Manrope", fontWeight:"600"}}>Chat with {modelName}</Typography>
      
      {/* <Tooltip title="Home" placement="right">
            <HomeIcon style={{ width: "140px", scale:"1.6",color:"gray" }}  />
      </Tooltip> */}

      <Box className="chat-history" 
     sx={{
      borderRadius: "24px",
      background: "linear-gradient(0deg, #7F7F7F 0%, #7F7F7F 100%), rgba(57, 56, 56, 0.50)",
      mixBlendMode: "color-dodge",
      width:"800px",
      marginLeft:"380px",
      fontFamily:"Manrope",
      color:"white",
      padding:"15px"
    }}>
    
        {chatHistory.map((msg, index) => (
          <Typography key={index} variant="body1" className="chat-message">{msg}</Typography>
        ))}
      </Box>
      <Box className="chat-container" sx={{display:"flex",marginLeft:"20%"}}>
      
      
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
            borderColor: 'pink', borderRadius:"10px"
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
          marginTop:"90px"
        }}
      />
      <Button variant="contained" className="send-button" onClick={handleSendMessage}
      sx={{bgcolor:"black",marginLeft:"-80px",marginTop:"97px"}}
      ><SendIcon/></Button>
      {error && (
        <Typography variant="subtitle2" color="error" className="error-message">{error}</Typography>
      )}
    </Box>
    </div>
  );
};

export default Chat;
