import React from 'react';
import '../css/HomePage.css';
import Search from "./Search";
import WeatherWidget from "./WeatherWidget";
import SocialMediaList from "./SocialMediaList/SocialMediaList";

class HomePage extends React.Component{
    render() {
        return (
            <div className={'page-content'}>
                <div className={'welcome-section'}>
                    <h2 className={'welcome-section__title'}>welcome to our weather app, <span>check the weather anywhere</span></h2>
                </div>
                <Search/>
                <WeatherWidget/>
                <SocialMediaList/>
            </div>
        );
    }
}

export default HomePage;