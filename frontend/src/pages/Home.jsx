// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const [open, setOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState({ name: '', description: '', goal: '' });
  const [models, setModels] = useState({ predefined_models: [], custom_models: [] });
  const [isCreating, setIsCreating] = useState(false); // New state to check if creating a new agent
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = () => {
    axios.get('http://localhost:5000/models')
      .then(response => {
        setModels(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the models!', error);
      });
  };

  const handleOpen = (agent, creating = false) => {
    setCurrentAgent(agent);
    setIsCreating(creating);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    axios.post('http://localhost:5000/create_model', currentAgent)
      .then(response => {
        console.log(response.data.message);
        fetchModels(); // Refresh models after creating a new one
      })
      .catch(error => {
        console.error('There was an error creating the agent!', error);
      });

    setOpen(false);
  };

  const handleChat = () => {
    navigate(`/chat/${currentAgent.name}`);
    setOpen(false);
  };

  return (
    <>
      <div className='container'>
        <div className='box1'>
          <nav>
            <ul className="icon-list">
              <div className='list'>
                <div className='list1'>
                  <li><HomeOutlinedIcon /></li>
                  <li><HelpOutlineRoundedIcon /></li>
                  <li><HistoryRoundedIcon /></li>
                  <li><GroupsOutlinedIcon /></li>
                </div>
                <div className='list2'>
                  <li><AnnouncementOutlinedIcon /></li>
                  <li><AccountCircleOutlinedIcon /></li>
                </div>
              </div>
            </ul>
          </nav>
        </div>

        <div className='box2'>
          <h1 style={{ marginBottom: '5px' }}>Discover Your Perfect AI Companion </h1>
          <h3>Tailored Intelligence for every need.</h3>
          <div className='boxes'>
            {models.predefined_models.map((model, index) => (
              <div key={index} className='agents' onClick={() => handleOpen(model)}>
                <h3>{model.name}</h3>
                <p>{model.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='box3'>
          <Button variant="contained" onClick={() => handleOpen({ name: '', description: '', goal: '' }, true)}>
            Create New Agent
          </Button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-agent-title"
        aria-describedby="modal-agent-description"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 500, bgcolor: 'black', border: '2px solid #000', boxShadow: 24, p: 4, borderRadius: '10%'
        }}>
          <Typography variant="subtitle1" sx={{ mt: 2, color: 'white' }}>
            Agent Name
          </Typography>
          <TextField
            fullWidth
            placeholder='Agent Name'
            name="name"
            value={currentAgent.name}
            onChange={handleChange}
            margin="normal"
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'gray',
                color: 'white',
                borderRadius: '15px',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'gray',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiInputLabel-shrink': {
                color: 'white',
              },
            }}
            disabled={!isCreating} // Disable input if not creating
          />

          <Typography variant="subtitle1" sx={{ mt: 2, color: 'white' }}>
            Agent Description
          </Typography>
          <TextField
            fullWidth
            placeholder='Agent Description'
            name="description"
            value={currentAgent.description}
            onChange={handleChange}
            margin="normal"
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'gray',
                color: 'white',
                borderRadius: '15px',
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'gray',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiInputLabel-shrink': {
                color: 'white',
              },
            }}
            disabled={!isCreating} // Disable input if not creating
          />

          {isCreating && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 2, color: 'white' }}>
                Your Goal
              </Typography>
              <TextField
                fullWidth
                placeholder='Your Goal'
                name="goal"
                value={currentAgent.goal}
                onChange={handleChange}
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: 'gray',
                    color: 'white',
                    borderRadius: '15px',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'gray',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-shrink': {
                    color: 'white',
                  },
                }}
              />
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={isCreating ? handleCreate : handleChat}
            >
              {isCreating ? 'Create' : 'Chat'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Home;
