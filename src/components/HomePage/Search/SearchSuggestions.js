import React from 'react';
import {connect} from 'react-redux';
import './SearchSuggestions.css';

class SearchSuggestions extends React.Component{
    constructor(props){
        super(props);
        this.focusedElement = React.createRef();
    }

    componentDidUpdate() {
        if (this.focusedElement.current)
            this.focusedElement.current.scrollIntoView();
    }

    renderList(){
        if (!this.props.citiesList || this.props.citiesList.length === 0)
            return ;

        let itemIndex = 0;
        return this.props.citiesList.map( (city) => {
            let isElementSelected = itemIndex === this.props.focusedItemIndex;
            return (
                <li
                    key={itemIndex++}
                    className={`suggestion-list__item ${isElementSelected ? 'focused-item' : ''}`}
                    ref={isElementSelected ? this.focusedElement : null}
                >
                    {city}
                </li>
            );
        });
    }

    render() {
        return <ul className='suggestion-list'>{this.renderList()}</ul>
    }
}

const mapStateToProps = (state) => {
    return {citiesList: state.citiesList, focusedItemIndex: state.focusedSuggestionListItem};
};

export default connect(mapStateToProps)(SearchSuggestions);