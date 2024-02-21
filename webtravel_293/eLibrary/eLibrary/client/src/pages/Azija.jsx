import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import '../styles/Evropa.css';
import axios from 'axios';


function Azija() {
  const [trips, setTrips] = useState([]);
  const [title, setTitle] = useState('');
  const cat = 'Azija'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/trips?cat=${cat}`);
        setTrips(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  
  fetchData();
   }, [title]);

  return (
    <div className='home-body'>
     

      <div className='landing-container'>
        <div>
          <div className='card-flex'>
            {trips?.map((trip) => (
              <Card key={trip.id}>{trip}</Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Azija;