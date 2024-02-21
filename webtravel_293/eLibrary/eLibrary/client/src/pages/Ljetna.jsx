import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import '../styles/Evropa.css';
import axios from 'axios';


function Ljetna() {
  const [trips, setTrips] = useState([]);
  const [title, setTitle] = useState('');
  const cat = 'Ljetna putovanja'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/trips?cat=${cat}`);
        setTrips(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData2 = async () => {
      try {
        const res = await axios.get(`/trips/search/?cat=${cat}&title=${title}`);
        setTrips(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (title === '') {
      fetchData();
    } else {
      fetchData2();
    }
  }, [title]);

  return (
    <div className='home-body'>
      <div className='baner-elements'>
        
        <input
          className='search'
          type={'text'}
          placeholder='Pretraži naslove...'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

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

export default Ljetna;