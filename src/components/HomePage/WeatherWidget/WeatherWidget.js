import React from 'react';
import {connect} from 'react-redux';
import CurrentDayWeather from './CurrentDayWeather/CurrentDayWeather';
import ThreeDaysWeather from "./ThreeDaysWeather/ThreeDaysWeather";
import WeatherHeader from "./WeatherHeader/WeatherHeader";
import './WeatherWidget.css';

class WeatherWidget extends React.Component{
    state = {showThreeWeatherWidget: false};

    switchWidget = () => {
        this.setState((prevState) => {return {showThreeWeatherWidget: !prevState.showThreeWeatherWidget}})
    };

    render() {
        if (this.props.currentLocationCoords){
            return (
                <div className='WeatherWidget'>
                    <WeatherHeader switchWidget={this.switchWidget} rotate={this.state.showThreeWeatherWidget}/>
                    {!this.state.showThreeWeatherWidget ? <CurrentDayWeather/> : <ThreeDaysWeather/>}
                </div>
            );
        }else {
            return <div className='loading'><p>Loading...</p></div>
        }
    }
}

const mapStateToProps = (state) => {
    return {currentLocationCoords: state.currentLocationCoords}
};

export default connect(mapStateToProps)(WeatherWidget);