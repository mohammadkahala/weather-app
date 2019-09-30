import React from 'react';
import './HomePage.css';
import Search from "./Search/Search";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import SocialMediaList from "./SocialMediaList/SocialMediaList";

const Welcome = () => {
    return (
        <div className={'welcome-section'}>
            <h2 className={'welcome-section__title'}>welcome to our weather app, <span>check the weather anywhere</span></h2>
        </div>
    )
};

class HomePage extends React.Component{
    render() {
        return (
            <main>
                <Welcome/>
                <Search/>
                <WeatherWidget/>
                <SocialMediaList/>
            </main>
        );
    }
}

export default HomePage;