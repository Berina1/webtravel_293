import React, {useEffect, useContext, useState} from 'react'
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import "../styles/profile.css";
import axios from 'axios';

function Profile() {
  
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {currentUser, deletedUser} = useContext(AuthContext);
  const [id, setId] = useState(currentUser.id);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const hiddenFileInput = React.useRef(null);
  const [email, setEmail] = useState("");
  const [error,setError] = useState("");
  const [file, setFile] = useState(""); 
  const navigate = useNavigate()

  useEffect(()=>{
    if(currentUser == null){
      navigate("/");
    }
  },[currentUser])

  useEffect(()=>{
    const getUser = async() => {
      const res = await axios.get(`/users/${currentUser.id}`);
      console.log( res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
    }
    getUser();
  },[]) 

  const validateEmail = (e) => {
    if (validator.isEmail(e)) {
      setError(" ");
      setEmail(e)
    } else {
    setError("Unesite validan email!");
    }
  };
    
  const uplaod = async () => {
    if(file !== null){
      try {
        const formData = new FormData();
        formData.append("file", file)
        const res = await axios.post("/upload", formData);
        console.log("in upload " + res.data)
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handelImage = async() =>{
    const imgUrl = await uplaod();
    try{
      await axios.put(`/users/user-image-upload/${currentUser.id}`, {
        img: file ? imgUrl : ""
      })
      handelRefresh();
    }catch(err){
      console.log(err);
    }
  }

  const handelDelete = async() => {
    try{
      await axios.delete(`/users/${currentUser.id}`);
      deletedUser();
      navigate("/") 
    }catch(err){
      console.log(err);
      alert('Greška!');
    }
  }

  const handelClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${currentUser.id}`, {
        username, 
        email, 
      });
      handelRefresh();
    } catch (err) {
      console.log(err);
    }
  }

  const handelClickPassword = async (e) => {
    e.preventDefault();
    try {
      if(newPassword !== ConfirmNewPassword){
        setError("Šifra mora biti identična!")
      }else{
        await axios.put(`/users/password-change/${currentUser.id}`, {
          username, 
          password,
          newPassword,
          id,
        });
        handelRefresh();
        alert('Šifra uspješno promijenjena!');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handelRefresh = () => {
    window.location.reload();
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      {currentUser? 
        <div className='main-div-profile'>
          <h1 className='title-profile'>Profil</h1>    
          <h2 className='title-profile'>Uredi:</h2>
     
          <div className='edit-div-profile'>
            <label className='label-profile'>Korisničko ime</label>
            <input className='input-profile' type={"text"} onChange={e => setUsername(e.target.value)} value={username} />
            <label className='label-profile'>Email</label>
            <label className='label-profile'>Trenutni email: {email}</label>
            <input className='input-profile' type="email" onChange={e => validateEmail(e.target.value) }/>
            <button className='button-profile' onClick={handelClick}>Potvrdi</button>
          </div>
      
          <h2 className='title-profile'>Uredi profilnu sliku</h2>
          <div className='image-div-profile'>
            <>
            <button onClick={handleClick} className="button-profile">
              Izaberi sliku
            </button>
            <input  ref={hiddenFileInput} style={{display:'none'}} type={"file"} onChange={e => setFile(e.target.files[0])}/>
            </>
            {file? <p className="image-text">{file.name}</p> : null}
            <button className='button-profile' onClick={handelImage}>Potvrdi</button>
          </div>
     
      <h2 className='title-profile'>Potvrdi šifru</h2>
      <div className='password-div-profile'>
        {error}
        <label className='label-profile'>Stara šifra</label>
        <input className='input-profile' type={"password"} onChange={e => setPassword(e.target.value)} value={password} />
        <label className='label-profile'>Nova šifra</label>
        <input className='input-profile' type={"password"} onChange={e => setNewPassword(e.target.value)} value={newPassword} />
        <label className='label-profile'>Ponovo unesi novu šifru</label>
        <input className='input-profile' type={"password"} onChange={e => setConfirmNewPassword(e.target.value)} value={ConfirmNewPassword} />
        <button className='button-profile' onClick={handelClickPassword}>Potvrdi</button>
      </div>
      
      <h2 className='title-profile'>Obrši profil</h2>
      <button className='button-delete-profile' onClick={handelDelete}>Obriši</button>
    </div>
    :<div></div>
    }
  </div>
  )
}

export default Profile