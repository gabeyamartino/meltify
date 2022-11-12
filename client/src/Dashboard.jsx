import React, { useState, useEffect } from 'react';
import Visualizer from './Visualizer.jsx';
import useAuth from './useAuth.jsx';
import axios from 'axios';

const Dashboard = ({code}) => {

  const accessToken = useAuth(code);


  const getSongs = () => {
    axios.get('http://localhost:3000/songs', {
      params: {
      'Authorization': accessToken,
      'Content-Type': 'application/json'
      }
    })
    .then((res) => {console.log(res)})
  }

  return (
    <div>
      <div onClick={()=>getSongs()}> We're in!!</div>
      <Visualizer />
    </div>
  )
}

export default Dashboard;
