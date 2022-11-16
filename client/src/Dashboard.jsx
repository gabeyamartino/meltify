import React, { useState, useEffect } from 'react';
import Player from './Player.jsx';
import TrackList from './TrackList.jsx';
import useAuth from './useAuth.jsx';
import axios from 'axios';
import styled from 'styled-components';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { ExpandMoreOutlined } from "@material-ui/icons";


const DashContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

`;

const InnerDash = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PlayerContainer = styled.div`
  margin-top: auto;
  postion: fixed;
  margin-bottom: 1px;
`;

const Dashboard = ({code}) => {

  const [topTracks, setTopTracks] = useState({ loaded: [] });
  const [playing, setPlaying] = useState('');
  const [trackFeatures, setTrackFeatures] = useState({})


  const accessToken = useAuth(code);

  const getSongs = () => {
    axios.get('http://localhost:3000/songs', {
      params: {
      'Authorization': accessToken,
      'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      let temp = [...res.data]
      setTopTracks({loaded: temp})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getFeatures = (track) => {

    axios.get('http://localhost:3000/features', {
      params: {
      'Authorization': accessToken,
      'Content-Type': 'application/json',
      'TrackId': track.id
      }
    })
    .then((response) => {
      let temp = {...response.data}
     setTrackFeatures(temp)
     console.log(temp)

    })
    .catch((err) => {
      console.log(err);
    })
  }

  const chooseTrack = (track) => {
    setPlaying(track)
  }

  useEffect(() => {
    if (accessToken) {
      getSongs();
    }
  }, [accessToken]);
console.log("IN DASHBOARD,", playing)


  const songKeys = {
    0: 'C',
    1: 'C♯/D♭',
    2: 'D',
    3: 'D♯/E♭',
    4: 'E',
    5: 'F',
    6: 'F♯/G♭',
    7: 'G',
    8: 'G♯/A♭',
    9: 'A',
    10: 'A♯/B♭',
    11: 'B'
  }

  const majMin = {
    0: 'Minor',
    1: 'Major'
  }

  const danceObj = {
    0.0: 'Not danceable'
  }

  return (
    <DashContainer>
      <InnerDash>
        <div>
          <TrackList
            topTracks={topTracks.loaded}
            chooseTrack={chooseTrack}
            accessToken={accessToken}
            getFeatures={getFeatures}
          />
        </div>
        <div>
          <Accordion
            style={{marginTop: "20px", width: "60vw"}}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            Song Features
          </AccordionSummary>

          <AccordionDetails>
            {Object.keys(trackFeatures).length ?
              <div>
                <div>Title: {playing.name}</div>
                <br/>
                <div>Key: {songKeys[trackFeatures.key]} {majMin[trackFeatures.mode]}</div>
                <br/>
                <div>Tempo: {Math.floor(trackFeatures.tempo)} bpm</div>
                <br/>
                <div>Time Signature: {trackFeatures.time_signature}/4</div>
                <br/>
                <div>Danceability <small>(0 - 100)</small>: {Math.round(trackFeatures.danceability * 100)}</div>
                <br/>
                <div>Energy <small>(0 - 100)</small>: {Math.round(trackFeatures.energy * 100)}</div>
                <br/>
                <div>Valence <small>(0 - 100)</small>: {Math.round(trackFeatures.valence * 100)}</div>
                <br/>
              </div>
              : <div>Please select a song</div>}
          </AccordionDetails>
          </Accordion>
        </div>
      </InnerDash>
      <PlayerContainer>
        <Player
          accessToken={accessToken}
          trackUri={playing?.uri}
          topTracks={topTracks.loaded}
        />
      </PlayerContainer>
    </DashContainer>
  )
}

export default Dashboard;
