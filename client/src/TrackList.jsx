import React from 'react';
import TrackListEntry from './TrackListEntry.jsx';
import styled from 'styled-components';

const ListContainer = styled.div`
max-height: 83vh;
max-width: 500px;
overflow: scroll;
`

const TrackList = ({ topTracks, chooseTrack, accessToken, getFeatures }) => {
  return (
    <div style={{width: '100%'}}>
      <div>
        <h2 style={{paddingTop: "28px"}}>Your Top Tracks</h2>
        <ListContainer>
          {topTracks.map((track, i) => (
          <TrackListEntry
          track={track}
          key={i}
          chooseTrack={chooseTrack}
          accessToken={accessToken}
          getFeatures={getFeatures}
          />))}
        </ListContainer>
      </div>
    </div>
  )
}

export default TrackList;
