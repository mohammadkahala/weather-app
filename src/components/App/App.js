import React from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import HomePage from "../HomePage/HomePage";
import Header from "../Header/Header";
import {getCurrentLocation} from '../../actions';
import 'css/reset.css';
import './App.css';

class App extends React.Component{
    componentDidMount() {
        this.props.getCurrentLocation();
    }

    render() {
        return(
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path='/home' render={() =>
                            <HomePage/>
                        }/>
                        <Route path='/' render={() =>
                            <div className='error-message'>
                                <h2>404 Not Found</h2>
                                <p>this page is under development</p>
                            </div>
                        }/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default connect(null, {getCurrentLocation})(App);