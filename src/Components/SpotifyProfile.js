import React, { useState, useEffect } from 'react';
import css from '../Style/SpotifyProfile.module.css';

const SpotifyProfile = () => {
    // Retrieve the stored authorization code from localStorage
    const [userData,SetUserData] = useState(null);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const userData = await response.json();
                SetUserData(userData);
                // Handle the user data as needed - display, process, etc.
            } else {
                console.error('Failed to fetch user profile');
            }
        } 

        catch (error) {
            console.error('Error fetching user profile:', error);
        }   
    };
    
    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <>
            {userData ? 
                <div className={css.profile_container}>
                    <img className={css.profile_image} src={userData.images[1].url} />
                    <p className={css.profile_name}>{userData.display_name}</p>
                </div>
                :
                'hey'
            }
        </>
    );
};

export default SpotifyProfile;
