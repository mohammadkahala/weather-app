import { combineReducers } from "redux";
import citiesList from './getCitiesList';

const focusedSuggestionListItem = (itemIndex = 0, action) => {
    let suggestionListLength = action.payload;
    let newIndex = itemIndex;
    if (action.type === "ARROW_UP"){
        newIndex = itemIndex - 1;
        resetItemIndex();
    }else if(action.type === "ARROW_DOWN"){
        newIndex = itemIndex + 1;
        resetItemIndex();
    }

    return newIndex;

    function resetItemIndex(){
        if (newIndex < 0)
            newIndex = suggestionListLength - 1;
        else if(newIndex >= suggestionListLength)
            newIndex = 0;
    }
};

const geolocation = (currentLocation = null, action) => {
    if (action.type === "GEOLOCATION")
        return action.payload;
    return currentLocation;
};

const currentDayWeather = (currentDayWeather = null, action) => {
    if(action.type === "CURRENT_WEATHER")
        return action.payload;

    return currentDayWeather;
};

export default combineReducers({
    citiesList: citiesList,
    focusedSuggestionListItem: focusedSuggestionListItem,
    currentLocationCoords: geolocation,
    currentDayWeather: currentDayWeather
});