import React from 'react';
import '../css/ThreeDaysWeather.css';

function SingleDayWeather(props) {
    return (
        <div className='ThreeDaysWeather__section'>
            <p className='ThreeDaysWeather__date'>{props.date}</p>
            <img className='ThreeDaysWeather__img' src='http://localhost:3000/images/clear.png' alt='weather icon'/>
            <div className='ThreeDaysWeather__temp'><p>{props.maxTemp}&deg;</p><p>{props.minTemp}&deg;</p></div>
        </div>
    )
}

class ThreeDaysWeather extends React.Component{
    render() {
        return (
            <div className='ThreeDaysWeather'>
                <SingleDayWeather date='Sat 4/10' maxTemp='10' minTemp='5'/>
                <SingleDayWeather date='Sat 4/10' maxTemp='10' minTemp='5'/>
                <SingleDayWeather date='Sat 4/10' maxTemp='10' minTemp='5'/>
            </div>
        )
    }
}

export default ThreeDaysWeather;