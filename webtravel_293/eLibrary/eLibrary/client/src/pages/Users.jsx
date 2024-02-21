import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import UserCard from '../components/UserCard'; // Prilagodite putanju prema stvarnom mjestu vaše komponente UserCard
import axios from 'axios';
import "../styles/users.css";
import { useNavigate, Link, useLocation } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = users.id;
  const {deletedUser} = useContext(AuthContext);
  const [editUserId, setEditUserId] = useState('');
const [newStatus, setNewStatus] = useState('');
const [newIsAdmin, setNewIsAdmin] = useState('');
const { currentUser } = useContext(AuthContext);

const handleEditUserIdChange = (event) => {
  setEditUserId(event.target.value);
};

const handleNewStatusChange = (event) => {
  setNewStatus(event.target.value);
};

const handleNewIsAdminChange = (event) => {
  setNewIsAdmin(event.target.value);
};

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async () => {
    try {
      await axios.post(`/users/${editUserId}`, {
        is_admin: newIsAdmin,
        status: newStatus,
        
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    console.log('Ažuriraj korisnika:', editUserId);
  };
  

  const [userIdToDelete, setUserIdToDelete] = useState('');

  const handleUserIdChange = (event) => {
    setUserIdToDelete(event.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${userIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${"unama"}`,
        },
      });
      deletedUser();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='content-box'>
      
      <div className='users-box'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className='mainpulate-with-users-box'>
        <div className='delete-user-box'>
          <input type="text" placeholder="Unesite ID korisnika" value={userIdToDelete} onChange={handleUserIdChange}/>
          <button onClick={handleDelete}>Izbriši korisnika</button>
        </div>
        <div className='edit-user-box'>
          <input type="text" placeholder="Unesite ID korisnika za uređivanje" value={editUserId} onChange={handleEditUserIdChange}/>
          <input type="text" placeholder="Unesite novi status" value={newStatus} onChange={handleNewStatusChange}/>
          <input type="text" placeholder="Unesite novu isAdmin vrijednost" value={newIsAdmin} onChange={handleNewIsAdminChange}/>
          <button onClick={handleEdit}>Uredi korisnika</button>
        </div>  
      </div>
    </div>
  );
}

export default App;
