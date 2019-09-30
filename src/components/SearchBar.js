import React from 'react';
import '../css/SearchBar.css';
import {connect} from 'react-redux';
import {getCitiesSuggestions, navigateSuggestionList, getCityWeather} from '../actions';

class SearchBar extends React.Component{
    state = { value : "" };

    onInputChange = (event) => {
        this.setState({value : event.target.value});
        this.props.getCitiesSuggestions(event.target.value);
    };

    onKeyDown = (event) => {
        switch (event.key) {
            case "ArrowDown" : this.props.navigateSuggestionList("ArrowDown");break;
            case "ArrowUp" : this.props.navigateSuggestionList("ArrowUp");break;
            default : return;
        }
    };

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.getCityWeather();
    };

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className='search-bar'>
                <input
                    className='search-bar__input'
                    placeholder='Search City'
                    type='text'
                    value={this.state.value}
                    onChange={this.onInputChange}
                    onKeyDown={this.onKeyDown}
                />
            </form>
        )
    }
}

export default connect(null, {getCitiesSuggestions, navigateSuggestionList, getCityWeather})(SearchBar);