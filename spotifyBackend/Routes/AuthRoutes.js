const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/get-access', async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID; // Fetch from environment variables
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Fetch from environment variables
  const redirectUri = process.env.HOME_URL; // Fetch from environment variables
  const scopes = encodeURIComponent('user-read-private user-read-email'); // Define scopes as needed

  const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;

  // Redirecting the user to Spotify for authorization
  res.status(200).json({ authURL });
});

// Handling the callback after user authorization
router.get('/spotify-callback', async (req, res) => {
  const authorizationCode = req.query.code; // Received authorization code from Spotify

  const clientId = process.env.SPOTIFY_CLIENT_ID; // Fetch from environment variables
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Fetch from environment variables
  const redirectUri = process.env.HOME_URL; // Fetch from environment variables

  const data = {
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data)
    });

    if (response.ok) {
      const responseData = await response.json();
      const accessToken = responseData.access_token;

      // Use the obtained access token as needed - for API requests, etc.
      res.status(200).json({ accessToken });
    } else {
      res.status(response.status).json({ error: 'Failed to obtain access token' });
    }
  } catch (error) {
    console.error('Error during access token request:', error);
    res.status(500).json({ error: 'Failed to obtain access token from Spotify' });
  }
});

module.exports = router;
