import React from 'react';
import styled from 'styled-components';

const AUTH_URL = "https:/accounts.spotify.com/authorize?client_id=2383676e4ea641d3b686c7dc5622f3a1&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const Login = () => {

  return (
    <LoginContainer>
    <a className="btn btn-success btn-lg" href={AUTH_URL}>Login with Spotify</a>
    </LoginContainer>
  )
}

export default Login;
