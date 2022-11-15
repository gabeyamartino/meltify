import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


const Player = ({ accessToken, trackUri }) => {

  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <div>
  <SpotifyPlayer
    style={{width: '100%'}}
    token={accessToken}
    callback={state => {
      if (!state.isPlaying) setPlay(true)
    }}
    uris={trackUri ? [trackUri] : []}
    autoPlay={play}
  />
  </div>)
}

export default Player;