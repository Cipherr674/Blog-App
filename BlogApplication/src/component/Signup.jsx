import { Button, TextField } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='container d-flex  flex-column justify-content-center align-items-center flex-grow-1 lform vh-100'>
      <h3>Blog Register Form</h3>
      <Grid container spacing={1}>

        <Grid size={{ xs: 6, md: 6 }}>
          <TextField fullWidth variant='outlined' label='Name' type='text'></TextField>
        </Grid>

        <Grid size={{ xs: 6, md: 6 }}>
        <TextField fullWidth variant='outlined' label='Email' type='email'></TextField>
        </Grid>

        <Grid size={{ xs: 6, md: 6 }}>
        <TextField fullWidth variant='outlined' label='Password' type='password'></TextField>
        </Grid>
        
        <Grid size={{ xs: 6, md: 6 }}>
        <TextField fullWidth variant='outlined' label='Phone' type='number'></TextField>
        </Grid>
{/* Use multine to control the text area */}

        <Grid size={{ xs: 12, md: 12 }}>
        <TextField fullWidth variant='outlined' label='Address' multiline rows={4}></TextField> 
        </Grid>

      </Grid>
      
      <Button type='buttton' variant='contained' color='primary' className='mt-1' style={{width:'200px'}} >LogIn</Button>
      <div><Link to={'/'}>Already Registered? Login here</Link></div> 

    </div>
  )
}

export default Signup