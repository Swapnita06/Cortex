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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import DrawIcon from '@mui/icons-material/Draw';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScienceIcon from '@mui/icons-material/Science';
import ExploreIcon from '@mui/icons-material/Explore';
import EventIcon from '@mui/icons-material/Event';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { TextField, Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './searchbar.css'


const Temp = () => {
  const [open, setOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState({ name: '', description: '', goal: '' });
  const [models, setModels] = useState([]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [selectedModels, setSelectedModels] = useState([]);
  const [isGroupChat, setIsGroupChat] = useState(false);
  
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, loginWithRedirect, logout, isLoading, error, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = () => {
    axios.get('https://cortex-rnd0.onrender.com/models')
      .then(response => {
        const allModels = response.data.custom_models
          .map(model => ({
            ...model,
            name: model.name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
          }))
          .reverse();
  
        setModels(allModels);
        setFilteredModels(allModels);
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
    const agentData = { ...currentAgent, email: user.email };
    axios.post('https://cortex-rnd0.onrender.com/create_model', agentData)
      .then(response => {
        console.log(response.data.message);
        fetchModels();
        toast.success('Agent created successfully! Find your agents in AI Playground!');
        navigate('/playground');
      })
      .catch(error => {
        console.error('There was an error creating the agent!', error);
        toast.error('Error creating the agent.');
      });

    setOpen(false);
  };

  const handleChat = () => {
    const formatModelName = (name) => {
      return name.replace(/\s+/g, '_').toLowerCase();
    };
  
    let modelNameToSend = formatModelName(currentAgent.name);
  
    if (isGroupChat) {
      if (selectedModels.length === 0) {
        alert('Please select at least one model for group chat.');
        return;
      }
      const selectedModelNames = selectedModels.map(model => formatModelName(model)).join(',');
      navigate(`/group-chat/${selectedModelNames}`);
    } else {
      navigate(`/chat/${modelNameToSend}`);
    }
    setOpen(false);
  };

  const handleModelSelection = (modelName) => {
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.includes(modelName)) {
        return prevSelectedModels.filter((name) => name !== modelName);
      } else if (prevSelectedModels.length < 3) {
        return [...prevSelectedModels, modelName];
      } else {
        toast.warn('You can select only up to 3 models for group chat at a time.');
        return prevSelectedModels;
      }
    });
  };

  const getAgentIcon = (modelName) => {
    switch (modelName.toLowerCase()) {
      case 'personal trainer':
        return <FitnessCenterIcon style={{ color: 'white' }} />;
      case 'investment advisor':
        return <ShowChartIcon style={{ color: 'white' }} />;
      case 'scientist':
        return <ScienceIcon style={{ color: 'white' }} />;
      case 'writer':
        return <DrawIcon style={{ color: 'white' }} />;
      case 'news editor':
        return <NewspaperIcon style={{ color: 'white' }} />;
      case 'wellness consultant':
        return <LocalHospitalIcon style={{ color: 'white' }} />;
      case 'event coordinator':
        return <EventIcon style={{ color: 'white' }} />;
      case 'travel coordinator':
        return <ExploreIcon style={{ color: 'white' }} />;
      case 'creative content strategists':
        return <FaceRetouchingNaturalIcon style={{ color: 'white' }} />;
      default:
        return null;
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterModels(event.target.value);
  };

  const filterModels = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filteredData = models.filter(model =>
      model.name.toLowerCase().includes(lowercasedQuery) ||
      model.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredModels(filteredData);
  };

  return (
    <div className={`home ${open ? 'blurry-background' : ''}`}>
      <ToastContainer />
      <div className='hidden-container'>sorry your device is incompatible...</div>
      <div className="container">
        <div className="box1">
          <nav>
            <ul className="icon-list">
              <div className="list">
                <div className="list1" style={{ color: "gray",position:"fixed" }}>
                  <Tooltip title="Home" placement="right">
                    <li><Link to="/home"><HomeOutlinedIcon sx={{width:"40px", color:"gray",'&:hover': { color: 'white'}}} /></Link></li>
                  </Tooltip>
                  <Tooltip title="Create New Agent" placement="right">
                    <li onClick={() => handleOpen({ name: '', description: '', goal: '' }, true)}><AddCircleOutlineIcon /></li>
                  </Tooltip>
                  <Tooltip title="Group Chat" placement="right">
                    <li onClick={() => {
                      setIsGroupChat(!isGroupChat);
                      toast.info('GROUP CHAT mode enabled. Select the desired models and then click on START GROUP CHAT icon!');
                    }}>
                      <GroupAddOutlinedIcon />
                    </li>
                  </Tooltip>
                  {isGroupChat && (
                    <Tooltip title={isGroupChat ? 'Start Group Chat' : 'Chat'} placement="right">
                      <li onClick={handleChat}><ChatOutlinedIcon /></li>
                    </Tooltip>
                  )}
                </div>
                <div className="list2" style={{ color: "gray", marginTop:"530px",position:"fixed"  }}>
                  <Tooltip title="Playground" placement="right">
                    <li><Link to="/playground"><SmartToyIcon sx={{color:"gray",'&:hover': { color: 'white'}}}/></Link></li>
                  </Tooltip>
                  <Tooltip title="Account" placement="right">
                    <li><Link to="/profile"><AccountCircleOutlinedIcon sx={{ width: "40px", color: "gray", '&:hover': { color: 'white' } }} /></Link></li>
                  </Tooltip>
                </div>
              </div>
            </ul>
          </nav>
        </div>

        <div className="box2" style={{ marginTop: "20px" }}>
          <div className="fixed-header">
            <h1 className="main-heading">Welcome to Cortex!</h1>
            <TextField
              label="Search Models"
              value={searchQuery}
              onChange={handleSearchInputChange}
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
            />
          </div>
          <div className="agent-container">
            {filteredModels.map((agent, index) => (
              <div key={index} className={`agent ${open ? 'blurry-background' : ''}`} onClick={() => handleOpen(agent)}>
                <div className="agent-icon">
                  {getAgentIcon(agent.name)}
                </div>
                <div className="agent-details">
                  <h2>{agent.name}</h2>
                  <p>{agent.description}</p>
                  <p>{agent.goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-box" sx={{ p: 4 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {isCreating ? 'Create New Agent' : 'Agent Details'}
            </Typography>
            <TextField
              label="Agent Name"
              name="name"
              value={currentAgent.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Agent Description"
              name="description"
              value={currentAgent.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Agent Goal"
              name="goal"
              value={currentAgent.goal}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {isGroupChat && (
              <div className="model-selection">
                <Typography variant="body1">Select up to 3 models for group chat:</Typography>
                {models.map((model, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={selectedModels.includes(model.name)}
                        onChange={() => handleModelSelection(model.name)}
                        disabled={selectedModels.length >= 3 && !selectedModels.includes(model.name)}
                      />
                    }
                    label={model.name}
                  />
                ))}
              </div>
            )}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={isCreating ? handleCreate : handleChat}>
                {isCreating ? 'Create' : 'Chat'}
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Temp;
