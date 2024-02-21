import { Link } from 'react-router-dom';
import "../styles/card.css";
import React from 'react';

function Card(props) {

  return (    
    <Link className='link-card-trip' to={"/trip/" + props.children.id}>
        {console.log(props.children.id)}
        <div className='card-box-trip'>
            <div className='title-box-trip'>
            <h2>{props.children.title}</h2>
        </div>
            <div className='image-box-trip'>
                <img className='image-box-trip-img' src={`../upload/${props.children.img}`} alt="trip image"/>
            </div>
            <div className='description-box-trip'>
                <p className='desc-text-card-trip'>{props.children.desc}</p>
            </div>
        </div>
    </Link>
  )
}

export default Card
