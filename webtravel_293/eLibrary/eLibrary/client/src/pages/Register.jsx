import React,{useState,useEffect,useContext} from 'react';
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from '../context/authContext';
import {Link, useNavigate} from "react-router-dom";
import validator from "validator";
import "../styles/register.css";
import axios from "axios";


function Register() {
  const {currentUser} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(currentUser !== null){
      navigate("/");
    }
  },[currentUser])

  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  const [error,setError] = useState(null);

  const validateEmail = (e) => {
    if (validator.isEmail(e.target.value)) {
      setError(" ");
      setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
    } else {
      setError("Unesi važeći E-mail!");
    }
  };

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try{
      if(inputs.username === "" || inputs.email === "" || inputs.password === "" || inputs.confirmPassword === "" ){
        setError("Sva polja moraju biti popunjena!")
      }else if(inputs.password !== inputs.confirmPassword){
          setError("Lozinke moraju biti iste!")
      }else{
        console.log("Uspjenso registorvani")
        await axios.post("/auth/register",inputs)
        navigate("/login");
      }
    }catch(err){
      console.log(err);
      setError(err.response.data)
    }
  }

  return (
    <div className={`App ${theme}`}>
      {currentUser? 
      <div></div>: 
      <div className="formR">
        <h1 className='titleR'>Registracija</h1>
        <form  className='itemsR'>
        
          <div className="fieldR">
            <input className='inputFormR' autocomplete="off" type={"text"} name='username' onChange={handleChange}/>
            <label className={inputs.username ? 'labelFormValueR' :'labelFormR' }>Korisničko ime</label>
          </div>
        
          <div className="fieldR">
            <input  className='inputFormR' autocomplete="off" type={"email"} name='email' onChange={validateEmail}/>
            <label className={inputs.email ? 'labelFormValueR' :'labelFormR' }>E-mail</label>
          </div>
       
          <div className="fieldR">
            <input className='inputFormR' autocomplete="off" type={"password"} name='password' onChange={handleChange}/>
            <label className={inputs.password ? 'labelFormValueR' :'labelFormR' }>Lozinka</label>
          </div>
       
          <div className="fieldR">
            <input className='inputFormR' autocomplete="off" type={"password"} name='confirmPassword' onChange={handleChange}/>
            <label className={inputs.confirmPassword ? 'labelFormValueR' :'labelFormR' }>Potvrdi lozinku</label>
          </div>
       
          <p className={error ? 'errorR' : null}>{error}</p>
          <button type='submitR' className='buttonR' onClick={handleSubmit}>Potvrdi</button>
          <div className='otherR'>
            <Link className='linkR' to={"/Login"}>Prijavi se</Link> <p>ili</p> <Link className='linkR' to={"/"}>Vrati se na početnu</Link> 
          </div>
        
        </form>
      </div>
      }
    </div>
  )
}

export default Register