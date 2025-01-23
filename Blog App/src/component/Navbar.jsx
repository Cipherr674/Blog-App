import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import { AppBar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'black'}}>
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BlogApp
          </Typography>
         <Link to={'/blogs'}><Button style={{color:'white'}} >Home</Button> </Link> 
          <Link to={'/addblogs'}><Button style={{color:'white'}} >AddBlog</Button></Link>
          <Link to={'/'}><Button style={{color:'white'}} onClick={()=>{
            sessionStorage.removeItem('logintoken')
          }}>Logout</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar