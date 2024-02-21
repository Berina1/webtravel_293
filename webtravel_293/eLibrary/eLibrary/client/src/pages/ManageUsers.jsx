import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import '../styles/Evropa.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function ManageUser() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');

  const id = location.pathname.split("/");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users`);
        setUsers(res.data); 
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (title === '') {
      setUsers([]);
      fetchData();
    }
  }, [title]);

  return (
    <div className='home-body'>
      <div className='landing-container'>   
      <div className='landing-container'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      </div>
    </div>
  );
}

export default ManageUser;
