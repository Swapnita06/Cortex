import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

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
        </div>
      )}
    </div>
  );
}

export default Profile;
