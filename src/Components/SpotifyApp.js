import React, { useState, useEffect } from 'react';
import css from '../Style/SpotifyApp.module.css';
import SpotifyAuth from './SpotifyAuth';
import SpotifyProfile from './SpotifyProfile';

const SpotifyApp = () => {
 
  return (
    <div>
        <SpotifyAuth />
        <SpotifyProfile />
    </div>
  );
};

export default SpotifyApp;
