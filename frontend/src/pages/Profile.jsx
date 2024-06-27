import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const [apiKey, setApiKey] = useState('');
  const [about, setAbout] = useState('');
  const [customModels, setCustomModels] = useState([]);

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCustomModels();
    }
  }, [isAuthenticated]);

  const fetchCustomModels = () => {
    axios.get('https://cortex-rnd0.onrender.com/user_models')
      .then(response => {
        setCustomModels(response.data.models);
      })
      .catch(error => {
        console.error('There was an error fetching the custom models!', error);
      });
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleLogout = () => {
    logout({ returnTo: 'https://cortex-sable.vercel.app/' });
  };

  return (
    <div className='profile-page'>
      <ToastContainer />
      <nav>
        <ul className="icon-list">
          <div className="list">
            <div className="list1" style={{ color: "gray", position: "fixed" }}>
              <li>
                <Link to="/home">
                  <HomeOutlinedIcon sx={{ width: "40px", color: "gray", '&:hover': { color: 'white' } }} />
                </Link>
              </li>
              <li onClick={() => toast.info('Create New Agent')}>
                <AddCircleOutlineIcon />
              </li>
              <li onClick={() => toast.info('GROUP CHAT mode enabled')}>
                <GroupAddOutlinedIcon />
              </li>
              <li onClick={() => toast.info('Start Group Chat')}>
                <ChatOutlinedIcon />
              </li>
            </div>
            <div className="list2" style={{ color: "gray", marginTop: "530px", position: "fixed" }}>
              <li>
                <Link to="/playground">
                  <SmartToyIcon sx={{ color: "gray", '&:hover': { color: 'white' } }} />
                </Link>
              </li>
              <li>
                <AccountCircleOutlinedIcon />
              </li>
            </div>
          </div>
        </ul>
      </nav>
      <div className='profile-container'>
        {isAuthenticated && (
          <div className='profile-details'>
            <div className='profile-left'>
              <div className='profile-photo'>
                {user.picture && (
                  <img src={user.picture} alt="Profile" />
                )}
              </div>
              <div className='api-key-section'>
                <label htmlFor="apiKey">Enter your API key:</label>
                <input
                  type="password"
                  id="apiKey"
                  name="apiKey"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                />
                <p>This API key can be used for accessing specific services or APIs.</p>
              </div>
              <div className='user-details'>
                <p>Name: {user.name}</p>
                <p>Nickname: {user.nickname}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
            <div className='profile-right'>
              <div className='about-section'>
                <h3>About</h3>
                <textarea
                  value={about}
                  onChange={handleAboutChange}
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className='custom-models-section'>
                <h3>Your Custom Models</h3>
                <ul>
                  {customModels.map((model, index) => (
                    <li key={index}>{model.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
