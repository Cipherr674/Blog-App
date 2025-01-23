import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { data, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material'
import axios from 'axios';
import axiosInstance from '../axiosInterceptor';


const AddBlogs = () => {
const location = useLocation(); // used for the update function , learn more
  const [form1,setForm1]=useState({
    title:'',
    description:'',
    image:''
  })

  const navigate=useNavigate();

  const capValue = async () => {
      if (location.state!=null) {
        axiosInstance.put('/api/server/edit/'+location.state.val._id,form1).then((res)=>{
          navigate('/blogs');
        
        })
       
      } else {
        axiosInstance.post('/api/server/add', form1).then((res)=>{
          navigate('/blogs')
          
          
        }).catch((error)=>{
          alert('Error');
        })
      }    
  }
// we completed the update function on home page, now to display the values on the add blogs page we use use effect to load the page with prefilled data
  useEffect(()=>{
    if (location.state!=null) {
        setForm1({...form1,ID:location.state.val.title,
          description:location.state.val.description,
          image:location.state.val.image
        })
    } else {setForm1({...form1,title:'',
      description:'',
      image:''
    })
    }
  },[location.state]); // The issue you're facing arises because of the way you're updating the state in the useEffect hook. Specifically, the useEffect is called on every render due to the missing dependency array,
  //  and it keeps overwriting the form1 state. This prevents the user from typing into the text fields.

  return (
    <div>
          <div className='container d-flex  flex-column justify-content-center align-items-center flex-grow-1 lform vh-100'>
      <h3>Create your own Blog</h3>
      <Grid container spacing={1}>

        <Grid size={{ xs: 6, md: 12 }}>
          <TextField fullWidth variant='outlined' value={form1.title}   label='Name' type='text' name='title' onChange={(e)=>{setForm1({...form1,title:e.target.value})}}></TextField>
        </Grid>

        <Grid size={{ xs: 6, md: 12 }}>
        <TextField fullWidth variant='outlined'  value={form1.description}  label='Description' type='email' name='description' onChange={(e)=>{setForm1({...form1,description:e.target.value})}}></TextField>
        </Grid>

        <Grid size={{ xs: 6, md: 12 }}>
        <TextField fullWidth variant='outlined'  value={form1.image}  label='Image Link' type='text' name='image' onChange={(e)=>{setForm1({...form1,image:e.target.value})}}></TextField>
        </Grid>
      

      </Grid>
      
      <Button type='buttton' variant='contained' color='primary' className='mt-1' style={{width:'200px'}} onClick={capValue}>Submit</Button>
    
    </div>
    </div>
  )
}

export default AddBlogs
