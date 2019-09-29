import React from 'react';
import {connect} from 'react-redux';
import "../css/CurrentDayWeather.css";
import {getCurrentDayWeather} from '../actions';

class CurrentDayWeather extends React.Component{
    componentDidUpdate() {
        //if i have the current location and do not have the current weather then request it
        if (this.props.currentLocationCoords && this.props.currentDayWeather === null){
            this.props.getCurrentDayWeather();
        }
    }

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
                        <img className='currentDayWeather__visual__icon' src={"http://localhost:3000/images/clear.png"}
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
    return {currentLocationCoords: state.currentLocationCoords, currentDayWeather: state.currentDayWeather};
};

export default connect(mapStateToProps, {getCurrentDayWeather})(CurrentDayWeather);