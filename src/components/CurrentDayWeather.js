import React from 'react';
import {connect} from 'react-redux';
import "../css/CurrentDayWeather.css";

class CurrentDayWeather extends React.Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("update");
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
    return {currentDayWeather: state.currentDayWeather};
};

export default connect(mapStateToProps)(CurrentDayWeather);