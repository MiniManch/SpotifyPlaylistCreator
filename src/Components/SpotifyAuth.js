import React, { useState, useEffect } from 'react';
import css from '../Style/SpotifyAuth.module.css';

const SpotifyAuthComponent = () => {
  const [userAuthCode, SetUserAuthCode] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      SetUserAuthCode(code);
      // perhaps add a message saying authorized or something like that shit
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSpotifyAuth = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/get-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.authURL; 
      } else {
        console.error('Failed to get Spotify authorization URL');
      }
    } catch (error) {
      console.error('Error during Spotify authentication:', error);
    }
  };

  return (
    <div>
      <button className={css.spotify_button} onClick={handleSpotifyAuth}>
        Authorize with Spotify
      </button>
    </div>
  );
};

export default SpotifyAuthComponent;
