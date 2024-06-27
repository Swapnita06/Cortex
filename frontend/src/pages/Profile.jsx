import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [apiKey, setApiKey] = useState('');

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  return (
    <div className='profile-container' style={{ padding: '20px', color: 'white', fontFamily: 'Manrope' }}>
      {isAuthenticated && (
        <div>
          <h3 className="user-name" style={{ fontWeight: '400', textAlign: 'center' }}>
            Welcome, {user.name}!
          </h3>
          <div style={{ textAlign: 'center' }}>
            {user.picture && (
              <img src={user.picture} alt="Profile" style={{ borderRadius: '50%', width: '100px', marginBottom: '10px' }} />
            )}
            <p style={{ fontWeight: '300' }}>Name: {user.name}</p>
            <p style={{ fontWeight: '300' }}>Nickname: {user.nickname}</p>
            <p style={{ fontWeight: '300' }}>Email: {user.email}</p>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <label htmlFor="apiKey" style={{ fontWeight: '400' }}>Enter your API key:</label>
            <input
              type="text"
              id="apiKey"
              name="apiKey"
              value={apiKey}
              onChange={handleApiKeyChange}
              style={{ marginLeft: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <p style={{ marginTop: '10px', fontWeight: '300', fontSize: '0.9rem' }}>
              This API key can be used for accessing specific services or APIs.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
