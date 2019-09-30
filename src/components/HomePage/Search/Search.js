import React from 'react';
import SearchBar from "./SearchBar";
import SearchSuggestions from "./SearchSuggestions";

class Search extends React.Component{
    render() {
        return (
            <div>
                <SearchBar/>
                <SearchSuggestions/>
            </div>
        )
    }
}

export default Search;