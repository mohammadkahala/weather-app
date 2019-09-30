import React from 'react';
import CurrentDayWeather from './CurrentDayWeather';
import ThreeDaysWeather from "./ThreeDaysWeather";
import '../css/WeatherWidget.css';
import WeatherHeader from "./WeatherHeader";
import {connect} from 'react-redux';
import {getCurrentDayWeather, getThreeDayWeather} from "../actions";

class WeatherWidget extends React.Component{
    state = {showThreeWeatherWidget: false, fetchedWeather: false};

    switchWidget = () => {
        this.setState((prevState) => {return {showThreeWeatherWidget: !prevState.showThreeWeatherWidget}})
    };

    // componentDidUpdate() {
    //     if (!this.state.fetchedWeather && this.props.currentLocationCoords){
    //         this.setState((prevState) => {
    //             return {fetchedWeather: !prevState.fetchedWeather}
    //         }, () => {
    //             this.props.getCurrentDayWeather();
    //             this.props.getThreeDayWeather();
    //         })
    //     }
    // }

    render() {
        if (this.props.currentLocationCoords){
            return (
                <div className='WeatherWidget'>
                    <WeatherHeader switchWidget={this.switchWidget} rotate={this.state.showThreeWeatherWidget}/>
                    {!this.state.showThreeWeatherWidget ? <CurrentDayWeather/> : <ThreeDaysWeather/>}
                </div>
            );
        }else {
            return <div>Loading</div>
        }
    }
}

const mapStateToProps = (state) => {
    return {currentLocationCoords: state.currentLocationCoords}
};

export default connect(mapStateToProps, {getThreeDayWeather, getCurrentDayWeather})(WeatherWidget);