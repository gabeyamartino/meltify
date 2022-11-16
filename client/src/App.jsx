import React, { useState } from 'react';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import './App.css';
import styled from 'styled-components';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <Dashboard code={code}/> : <Login />
}

export default App
