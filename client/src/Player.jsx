import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


const Player = ({ accessToken, trackUri, topTracks }) => {
  const [play, setPlay] = useState(false);
  const trackUris = topTracks.map((track)=> track.uri)

  useEffect(() => setPlay(true), [trackUri]);
  if (!accessToken) return null;
  return (
    <div>
  <SpotifyPlayer
    style={{width: '100%'}}
    token={accessToken}
    callback={state => {
      if (!state.isPlaying) setPlay(false)
    }}
    uris={trackUri ? trackUris.slice(trackUris.indexOf(trackUri)) : []}
    play={play}
  />
  </div>)
}

export default Player;