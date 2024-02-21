import React, {useState,useEffect,useContext} from 'react';

import { AuthContext } from '../context/authContext';

import { Link, useNavigate} from 'react-router-dom';

import "../styles/navbar.css";
import axios from 'axios';

function Navbar() {
  
  const {currentUser, isAdmin, logout} = useContext(AuthContext);
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const logOutUser = () => {
    logout();
    navigate("/");
  }

  useEffect(()=>{
    const getUser = async() => {
      const res = await axios.get(`/users/${currentUser.id}`);
      setUsername(res.data.username);
      setImg(res.data.img);
    }
    getUser();
  },[currentUser])


  let showAvatar = () => {
    if(currentUser){
      if(img){
        return <Link to={"/profile"} className="linkNavbar-profile" > <img className='profile-image'  src={`../upload/${img}`} alt="u.i"/></Link>
      }else{
        return <Link to={"/profile"} className="linkNavbar" > <p className='profile-image'/> </Link>
      }
    }else{
      return null
    }
  }

  return (
    <div className='navbar'>
      <div className='loginRegister'>
        {currentUser? null :  <Link to={"/login"} className="linkNavbar" >Prijava</Link>} 
        {currentUser? null : <Link to={"/register"} className="linkNavbar" >Registracija</Link> }
        {currentUser ? <>
        
        <p className='link-title-name'>{username ? username : currentUser?.username }</p>
      </> : null}
        {showAvatar()}
        <Link className='link-sideBar' to="/"><p>POČETNA</p></Link>

        {isAdmin() ? 
        <div>
          <Link className="link-sideBar" to="/write"> <p>DODAJ PUTOVANJE</p></Link>
        </div> : null}

        {isAdmin() ? 
        <div>
          <Link className="link-sideBar" to="/users"> <p>VIDI KORISNIKE</p></Link>
        </div> : null}

      {currentUser ? <div>
        <Link className='link-sideBar' to="/profile"><p>PROFIL</p></Link>
      </div> : null}

      {currentUser? <span onClick={logOutUser} className="link-sideBar" >ODJAVA</span> :  null} 
      <div className='margin-space'></div>

      
      <div className='dropdown'>
          <div className='title-sideBar' onClick={() => setShowDropdown(!showDropdown)} ><p>PUTOVANJA</p></div>
          {showDropdown && (
            <ul className='dropdown-list'>
              <li><Link to="/Azija">Azija</Link></li>
              <li><Link to="/Afrika">Afrika</Link></li>
              <li><Link to="/Evropa">Evropa</Link></li>
              <li><Link to="/Ljetna">Ljetna putovanja</Link></li>
              <li><Link to="/Zimska">Zimska putovanja</Link></li>
              <li><Link to="/Historijska">Historijska putovanja</Link></li>
              <li><Link to="/Prirodna">Prirodna čuda</Link></li>
            </ul>
          )}
        </div>
      
        

       
      </div>
      
      
    </div>
  )
}

export default Navbar