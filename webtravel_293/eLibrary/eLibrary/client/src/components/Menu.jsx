import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../styles/menu.css"
import axios from 'axios';

function Menu({cat}) {
    const [trips,setTrips] = useState([]);

    useEffect(()=>{
      const fetchData = async() =>{
        try{
          const res = await axios.get(`/trips/?cat=${cat}`);
          console.log("flag" + res.data)
          setTrips(res.data); 
        }catch(err){
          console.log(err);
        }
      }
      fetchData();
    },[cat])


  return (
    <div className='main-box-menu'> 
        <div>
            <h2 className='recomendation-title-menu'>Preporučeno</h2>
            {trips.slice(0, 3).map((trip)=> (
            <div key={trip.id} className="recomendation-box-menu">
              <Link className='link-menu' to={"/trip/" + trip.id}>
                 <h3 className='secondary-title-menu'>{trip.title}</h3>
                 <div className='content-menu'>
                   <p className='paragrph-menu'>{trip.desc}</p>
                   <img className='img-menu' src={`../upload/${ trip.img}`} alt="img here"/>
                 </div>
              </Link>
            </div>
        ))}  
        </div>
    </div>
  )
}

export default Menu