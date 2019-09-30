import React from 'react';
import './ThreeDaysWeather.css';
import {connect} from 'react-redux';

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

function SingleDayWeather(props) {
    let weatherState = props.weatherState === undefined ? 'clear' : props.weatherState;

    return (
        <div className='ThreeDaysWeather__section'>
            <p className='ThreeDaysWeather__date'>{props.date}</p>
            <img className='ThreeDaysWeather__img' src={getWeatherIcon(weatherState.toLowerCase())} alt='weather icon'/>
            <div className='ThreeDaysWeather__temp'><p>{props.maxTemp}&deg;</p><p>{props.minTemp}&deg;</p></div>
        </div>
    )
}

class ThreeDaysWeather extends React.Component{
    renderList = () => {
        return this.props.threeDaysWeather.map( ({date, main, weatherState}) => {
            return <SingleDayWeather
                date={date}
                maxTemp={main.tempMax}
                minTemp={main.tempMin}
                weatherState={weatherState}
            />
        })
    };

    render() {
        if (this.props.threeDaysWeather){
            return (
                <div className='ThreeDaysWeather'>
                    {this.renderList()}
                </div>
            )
        }else {
            return <div>Loading</div>;
        }
    }
}

const mapStateToProps = (state) => {
    return {currentLocationCoords: state.currentLocationCoords, threeDaysWeather: state.threeDaysWeather};
};

export default connect(mapStateToProps)(ThreeDaysWeather);