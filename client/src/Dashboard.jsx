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
  justify-content: space-between;
  min-height: 100vh;
  max-height: 100vh;
`;

const PlayerContainer = styled.div`
  margin-top: auto;
  postion: fixed;
  margin-bottom: 1px;
`;

const Dashboard = ({code}) => {

  const [topTracks, setTopTracks] = useState({ loaded: [] });
  const [playing, setPlaying] = useState('');

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
      console.log(response)
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

  return (
    <DashContainer>
      <div className="dash-cont">
        <TrackList
          topTracks={topTracks.loaded}
          chooseTrack={chooseTrack}
          accessToken={accessToken}
          getFeatures={getFeatures}
          />
        <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        Song Features
        </AccordionSummary>

        <AccordionDetails>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget.
        </AccordionDetails>
        </Accordion>
      </div>
      <PlayerContainer>
        <Player
          accessToken={accessToken}
          trackUri={playing?.uri}
        />
      </PlayerContainer>
    </DashContainer>
  )
}

export default Dashboard;
