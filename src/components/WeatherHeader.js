import React from 'react';
import '../css/WeatherHeader.css';

class WeatherHeader extends React.Component {
    render() {
        return (
            <div className='weather-header'>
                <img
                    onClick={this.props.switchWidget}
                    className={`weather-header__img ${this.props.rotate ? 'rotate' : ''}`}
                    src='http://localhost:3000/images/right-arrow.png'
                    alt='arrow'
                />
                <div className='weather-header__details'>
                    <p className='weather-header__details__city'>Ramallah PS</p>
                    <p className='weather-header__details__last-updated'>Last Updated : 10m ago</p>
                </div>
            </div>
        )
    }
}

export default WeatherHeader;