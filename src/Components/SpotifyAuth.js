import React, { useState, useEffect } from 'react';
import css from '../Style/SpotifyAuth.module.css';

const SpotifyAuthComponent = () => {
  const [userToken, setUserToken] = useState(null);
  const [authorizationCode, setAuthorizationCode] = useState(null);

  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.REACT_APP_HOME_URL;
  
  useEffect(() => {
    const handleCodeExchange = async () => {
      if (authorizationCode) {
        try {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: authorizationCode,
              redirect_uri: redirectUri,
              client_id: clientId,
              client_secret: clientSecret,
            }),
          });

          const data = await response.json();
          const accessToken = data.access_token;

          // Use the accessToken to make requests to the Spotify API
          const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const userData = await userResponse.json();
          console.log('User Data:', userData);

          // Set the token in state or perform other actions with userData
          setUserToken(accessToken);
        } catch (error) {
          console.error('Error exchanging code for token:', error);
        }
      }
    };

    handleCodeExchange();
  }, [authorizationCode, clientId, clientSecret, redirectUri]);

  const handleSpotifyAuth = () => {
    const authorizationURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authorizationURL;
  };

  useEffect(() => {
    // On component mount, check for the code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // Set the authorization code in state
    if (code) {
      setAuthorizationCode(code);
    }
  }, []);

  return (
    <div>
      <button className={css.spotify_button} onClick={handleSpotifyAuth}>Authorize with Spotify</button>
    </div>
  );
};

export default SpotifyAuthComponent;
