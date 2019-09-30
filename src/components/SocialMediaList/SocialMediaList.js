import React from 'react';
import './SocialMediaList.css';

import facebook from './icons/facebook.png';
import google from './icons/google.png';
import linkedIn from './icons/linkedin.png';
import pinterest from './icons/pinterest.png';
import twitter from './icons/twitter.png';
import youtube from './icons/youtube.png';

const socialIcons = [
    facebook,
    google,
    linkedIn,
    pinterest,
    twitter,
    youtube,
];

const renderList = () => {
    return socialIcons.map( (iconPath) => {
        return <img src={iconPath} alt='icon'/>;
    })
};

const SocialMediaList = () => {
    return (
        <div className='social-media-list'>
            {renderList()}
        </div>
    );
};

export default SocialMediaList;