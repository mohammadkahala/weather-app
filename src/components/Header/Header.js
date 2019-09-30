import React from 'react';
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import './Header.css';

class Header extends React.Component{
    render() {
        return (
            <div className={'header'}>
                <h1 className={'header__title'}>Asency</h1>
                <NavigationLinks/>
            </div>
        );
    }
}

export default Header;