import React,{useState,useContext,useEffect} from 'react'
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from '../context/authContext';
import {Link, useNavigate} from "react-router-dom";
import "../styles/login.css";

function Login() {
  const {login,currentUser} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const [error,setError] = useState(null);
  const navigate = useNavigate()
  

  useEffect(()=>{
    if(currentUser !== null){
      navigate("/");
    }
  },[currentUser])
  
  const [inputs,setInputs] = useState({
    username:"",
    password:""
  })

  const handleChange = (e) => {
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      
      await login(inputs);
        navigate("/");

      
    }catch(err){
      console.log(err);
      setError(err.response.data)
    }
  }

  return (
     <div className={`App ${theme}`}>
    
      {currentUser? 
      <div></div>: 
   
      <div className="formP">
        <h1 className='titleP'>Prijava</h1>
       
        <form className='itemsP'>
          <div className="fieldP">
            <input className='inputFormP' autocomplete="off" type={"text"} name="username" onChange={handleChange}/>
            <label className={inputs.username ? 'labelFormValueP' :'labelFormP' }>Korisničko ime</label> 
          </div>
          <div className="fieldP">
            <input autocomplete="off" className='inputFormP' type={"password"} name="password" onChange={handleChange}/>
            <label className={inputs.password ? 'labelFormValueP' :'labelFormP' }>Lozinka</label>
          </div>
          <p className={error ? 'errorP' : null}>{error}</p>
          
          <button className='buttonP' type='submitP' onClick={handleSubmit}>Potvrdi</button>
          <div className='otherP'>
            <Link className='linkP' to={"/register"}>Registruj se</Link> <p>ili</p>  <Link className='linkP' to={"/"}>Vrati se na početnu</Link> 
          </div>
        </form>  
      </div> }  
     </div>
  )
}

export default Login