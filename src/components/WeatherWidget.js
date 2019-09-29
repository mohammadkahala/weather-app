import React from 'react';
import CurrentDayWeather from './CurrentDayWeather';
import ThreeDaysWeather from "./ThreeDaysWeather";
import '../css/WeatherWidget.css';
import WeatherHeader from "./WeatherHeader";

class WeatherWidget extends React.Component{
    state = {showThreeWeatherWidget: false};

    switchWidget = () => {
        this.setState((prevState) => {return {showThreeWeatherWidget: !prevState.showThreeWeatherWidget}})
    };

    render() {
        return (
            <div className='WeatherWidget'>
                <WeatherHeader switchWidget={this.switchWidget} rotate={this.state.showThreeWeatherWidget}/>
                {!this.state.showThreeWeatherWidget ? <CurrentDayWeather/> : <ThreeDaysWeather/>}
            </div>
        );
    }
}

export default WeatherWidget;