import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Home = () => {
  const [cardData, setCardData] = useState([]); 
  const navigate=useNavigate();

  useEffect(() => {
    axiosInstance.get('/api/server/') 
      .then((res) => {
        setCardData(res.data); 
      })
      .catch((err) => {
        console.log(err); 
      });
  }, []);

  function update_data(val){
        navigate('/addblogs',{state:{val}})
  }

  function delete_data(id) {
    
    console.log("Deleting blog with ID:", id);
    
    axiosInstance.delete(`/api/server/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setCardData(cardData.filter(user => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="mt-5">
      <Grid container spacing={4}>
        {cardData.map((user) => ( 
          <Grid size={2} key={user._id}> {}
            <Card sx={{ minWidth: 250, maxWidth: 300 , minHeight: 300 }} className='ms-3'>
              <CardMedia
                sx={{ height: 140 }}
                image={user.image} 
                title={user.title} 
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" variant="contained" onClick={()=>{
                  update_data(user);
                }}>Update</Button>
                <Button size="small" color="primary" variant="text" onClick={()=>{
                  delete_data(user._id);
                }} >Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
