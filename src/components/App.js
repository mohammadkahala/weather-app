import React from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import HomePage from "./HomePage";
import Header from "./Header";
import {getCurrentLocation} from '../actions';
import '../css/reset.css';
import '../css/App.css';

class App extends React.Component{
    componentDidMount() {
        this.props.getCurrentLocation();
    }

    render() {
        return(
            <Router>
                <div>
                    <Header/>
                    <Route exact path='/home' render={() =>
                        <HomePage/>
                    }/>
                </div>
            </Router>
        )
    }
}

export default connect(null, {getCurrentLocation})(App);