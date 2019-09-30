import React from 'react';
import '../css/ThreeDaysWeather.css';
import {connect} from 'react-redux';

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
    renderList = () => {
        return this.props.threeDaysWeather.map( ({date, main, weatherState}) => {
            return <SingleDayWeather
                date={date}
                maxTemp={main.tempMax}
                minTemp={main.tempMin}
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