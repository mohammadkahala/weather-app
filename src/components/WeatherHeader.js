import React from 'react';
import {connect} from 'react-redux';
import '../css/WeatherHeader.css';

function updateTimeString(date){
    return `Updated On : ${date.toTimeString().split(' ')[0]}`;
}

class WeatherHeader extends React.Component {
    render() {
        if (this.props.weatherDetails){
            const {currentLocation, lastUpdated} = this.props.weatherDetails;
            return (
                <div className='weather-header'>
                    <img
                        onClick={this.props.switchWidget}
                        className={`weather-header__img ${this.props.rotate ? 'rotate' : ''}`}
                        src='http://localhost:3000/images/right-arrow.png'
                        alt='arrow'
                    />
                    <div className='weather-header__details'>
                        <p className='weather-header__details__city'>{currentLocation}</p>
                        <p className='weather-header__details__last-updated'>{updateTimeString(new Date(lastUpdated))}</p>
                    </div>
                </div>
            )
        }else {
            return <div>Loading...</div>
        }
    }
}

const mapStateToProps = (state) => {
    return {weatherDetails: state.currentDayWeather};
};

export default connect(mapStateToProps)(WeatherHeader);