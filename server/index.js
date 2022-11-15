const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.post('/login', (req, res) => {
  let code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:5173',
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  })

  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in})
      })
        .catch((err) => {
          res.sendStatus(400);
        })
  })

  app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:5173',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: refreshToken
    });

    spotifyApi.refreshAccessToken()
     .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in
        })
     })
     .catch((err) => {
      console.log(err)
      res.sendStatus(400);
     });
  });



/////////////
//SONGS ROUTE
/////////////

  app.get('/songs', (req, res) => {
    const token = req.query.Authorization
    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(token)

    spotifyApi.getMyTopTracks({limit: 50, time_range: 'long_term'})
     .then((data) => {res.json(data.body.items); console.log(data.body.items[0])})
     .catch((err) => console.log("error in my SONGS REQUESTS"))
  })


////////////////
//FEATURES ROUTE
////////////////

app.get('/features', (req, res) => {

  const token = req.query.Authorization
  const spotifyApi = new SpotifyWebApi()
  spotifyApi.setAccessToken(token)

  spotifyApi.getAudioFeaturesForTrack(req.query.TrackId)
    .then((data) => {
      res.send(data.body);
    })
    .catch((err) => {
      console.log(err)
    })
})


app.listen(port, () => {
  console.log(`melting on ${port}`)
})
