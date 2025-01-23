import { Button,TextField } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';



// here  we created a use state for the login form, so that when user logs in it uses the schema of the USerdata to login previously from a registered user.


const Login = () => {

  const[form,setForm]=useState({
    Email:'',
    Password:''
  })

  const navigate=useNavigate(); // to redirect to blog page when login is sucessfull

  const capValue = async () => {
    axios.post('/api/userserver/login', form).then((res)=>{
      
      if(res.data.token){
        sessionStorage.setItem('logintoken',res.data.token)
        alert(res.data.message);
        navigate('/blogs')
      }
      else{
        navigate('/')
      }
      
    }).catch((error)=>{
      alert('Invalid Login');
    })
  }
    
  
  




  return (
    <div className='container d-flex  flex-column justify-content-center align-items-center flex-grow-1 lform vh-100'>

      <h2>Blog App Login Page</h2>

      
      <div><TextField name='Email' type='email' placeholder='Email' variant='outlined' className='mt-3' onChange={(e)=>{setForm({...form,Email:e.target.value})}}></TextField></div>
            {/* here the name field is used to in the useState for the required data to be saved  */}
      <div><TextField name='Password'  type='password' placeholder='Password' variant='outlined'  className='mt-3' onChange={(e)=>{setForm({...form,Password:e.target.value})}}></TextField></div>
      
  
      
       
      <Button type='buttton' variant='contained' color='primary' className='mt-2' style={{width:'225px'}} onClick={capValue}>LogIn</Button> 
      <div><Link to={'/signup'}>New user? Please Register here</Link></div> 

      
 {/* to use this link, we have to install npm i react-router-dom */}
    
    </div>

  )
}

export default Login
