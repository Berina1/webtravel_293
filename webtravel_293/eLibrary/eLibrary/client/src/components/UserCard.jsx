import React from 'react';
import '../styles/userCard.css';

function UserCard({ user }) {
  

  return (
    <div className='card-box-user'>
      <div className='title-box-user'>
        <h2>{user.username}</h2>
      </div>
      <div className='description-box-user'>
        <p className='id-text-card-user'>ID: {user.id}</p>
        <p className='desc-text-card-user'>Email: {user.email}</p>
        <p className='status-text-card-user'>Status: {user.status}</p>
        <p className='status-text-card-user'>Role: {user.is_admin}</p> 
      </div>
    </div>
  );
}

export default UserCard;
