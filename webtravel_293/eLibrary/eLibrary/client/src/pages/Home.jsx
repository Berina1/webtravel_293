import React, { useEffect,useState } from 'react';
import { useLocation} from "react-router-dom";
import Card from '../components/Card';
import "../styles/Evropa.css";
import axios from 'axios';




function Home() {
  const [onlyCat,SetOnlyCat] = useState("");
  const [trips,setTrips] = useState([]);
  const [title,setTitle] = useState("");
  const cat = useLocation().search;

  useEffect(()=>{
    let onlyCatArry = cat.split("=")
    console.log("Cat " + onlyCatArry);
    SetOnlyCat(onlyCatArry[1]);
  },[cat])
  
  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const res = await axios.get(`/trips${cat}`);
        setTrips(res.data); 
      }catch(err){
        console.log(err);
      }
    }

  // const fetchData2 = async() =>{
  //   let getCat = ()=>{
  //     if(onlyCat === undefined){
  //       return cat
  //     }else{
  //       return onlyCat
  //     }
  //  }
      
  //   try{
  //     const res = await axios.get(`/trips/search/?cat=${getCat()}&title=${title}`);
  //     setTrips(res.data); 
  //   }catch(err){
  //     console.log(err);
  //   }
  // }


       fetchData();
   
 },[cat,title])

  return (
    <div className='home-body'>
      

      
      <div className="landing-container">
        <div>
          <div className='card-flex'>
            {trips?.map(trip=> (
              <Card key={trip.id}>{trip}</Card> 
             ))} 
          </div>
            </div> 
      </div>
    </div>
  )
}

export default Home