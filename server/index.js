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
          console.log(err)
          res.sendStatus(400);
        })
  })





  app.post('/refresh', (req, res) => {
    console.log('hi')
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


  app.get('/songs', (req, res) => {
    const token = req.query.Authorization

    const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`
    // {
    //   redirectUri: 'http://localhost:5173',
    //   clientId: process.env.SPOTIFY_CLIENT_ID,
    //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    // }

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(token);

    const me = spotifyApi.getMe()

    spotifyApi.getMyTopTracks({limit: 50})
     .then((data) => {res.json(data.body.items)})
     .catch((err) => console.log(err))

    // axios.get(TOP_TRACKS_ENDPOINT, {
    //   params: {
    //     'Authorization': `${token}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then((data) => {console.log(data)})

  })




app.listen(port, () => {
  console.log(`melting on ${port}`)
})
