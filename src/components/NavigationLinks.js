import React from 'react';
import {NavLink } from 'react-router-dom';
import '../css/NavigationLinks.css';

const NavigationLinks = () => {
    return (
        <nav className={'navigation'}>
            <ul>
                <li><NavLink  className={'navigation__link'} activeClassName="selected-nav" to="/home">Home</NavLink ></li>
                <li><NavLink  className={'navigation__link'} activeClassName="selected-nav" to="/subscribe">SUBSCRIBE</NavLink ></li>
                <li><NavLink  className={'navigation__link'} activeClassName="selected-nav" to="/features">FEATURES</NavLink ></li>
                <li><NavLink  className={'navigation__link'} activeClassName="selected-nav" to="/contacts">CONTACTS</NavLink ></li>
                <li><NavLink  className={'navigation__link'} activeClassName="selected-nav" to="/about">ABOUT</NavLink ></li>
            </ul>
        </nav>
    )
};

export default NavigationLinks;