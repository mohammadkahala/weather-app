import React from 'react';
import {connect} from 'react-redux';
import "./CurrentDayWeather.css";

import clear from '../weather-icons/clear.png';
import clouds from '../weather-icons/cloud.png';
import rain from '../weather-icons/rain.png';

const getWeatherIcon = (condition) => {
    switch (condition) {
        case "clouds" : return clouds;
        case "clear" : return clear;
        case "rain" : return rain;
        default : return clear;
    }
};

class CurrentDayWeather extends React.Component{
    render() {
        if (this.props.currentDayWeather) {
            const {main, weatherState} = this.props.currentDayWeather;
            return (
                <div className='currentDayWeather'>
                    <p className='currentDayWeather__main-temp'>{main.temp}&#176;</p>
                    <ul className='currentDayWeather__details'>
                        <li key={1} className='currentDayWeather__details__item'><p>max {main.tempMax}&deg;</p></li>
                        <li key={2} className='currentDayWeather__details__item'><p>min {main.tempMin}&deg;</p></li>
                        <li key={3} className='currentDayWeather__details__item'><p>hum {main.humidity}%</p></li>
                    </ul>
                    <div className='currentDayWeather__visual'>
                        <img className='currentDayWeather__visual__icon' src={getWeatherIcon(weatherState.toLowerCase())}
                             alt="weatherIcon"/>
                        <p className='currentDayWeather__visual__condition'>{weatherState}</p>
                    </div>
                </div>
            )
        }else {
            return <div>Loading...</div>
        }
    }
}

const mapStateToProps = (state) => {
    return {currentDayWeather: state.currentDayWeather};
};

export default connect(mapStateToProps)(CurrentDayWeather);