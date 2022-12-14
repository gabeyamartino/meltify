import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TrackContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  text-align: left;
  &:hover {
    background-color: blue;
    cursor: pointer
  }
`;

const TrackListEntry = ({ track, chooseTrack, accessToken, getFeatures }) => {

  const handlePlay = () => {
    chooseTrack(track);
  }

  return (
    <TrackContainer
      onClick={()=> {handlePlay(); getFeatures(track)}}>
      <img src={track.album.images[0].url} style={{height: '64px', width: '64px', margin: '4px 8px 4px 0'}} />
      <div>
        <div>{track.name}</div>
        <div>{track.artists[0].name}</div>
      </div>
    </TrackContainer>
  )
}

export default TrackListEntry;