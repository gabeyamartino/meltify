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

const AccordionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HotDog = styled.img`
transition: transform .7s ease-in-out;

  &:hover {
    transform: rotate(360deg)
  }
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
        <AccordionContainer>
          <HotDog src="../../hotdog.png" style={{marginTop: "40px"}}></HotDog>
          <Accordion
            style={{width: "60vw"}}>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              Song Features
            </AccordionSummary>
            <AccordionDetails>
              {Object.keys(trackFeatures).length ?
                <div>
                  <div><b>Title:</b> {playing.name}</div>
                  <br/>
                  <div><b>Key:</b> {songKeys[trackFeatures.key]} {majMin[trackFeatures.mode]}</div>
                  <br/>
                  <div><b>Tempo:</b> {Math.floor(trackFeatures.tempo)} bpm</div>
                  <br/>
                  <div><b>Time Signature:</b> {trackFeatures.time_signature}/4</div>
                  <br/>
                  <div><b>Danceability <small>(0 - 100)</small>:</b> {Math.round(trackFeatures.danceability * 100)}</div>
                  <br/>
                  <div><b>Energy <small>(0 - 100)</small>:</b> {Math.round(trackFeatures.energy * 100)}</div>
                  <br/>
                  <div><b>Valence <small>(0 - 100)</small>:</b> {Math.round(trackFeatures.valence * 100)}</div>
                  <br/>
                </div>
              : <div>Please select a song</div>}
            </AccordionDetails>
          </Accordion>
        </AccordionContainer>
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
