import { combineReducers } from "redux";

const citiesList = (citiesList = [], action) => {
    if (action.type === "CITIES_SUGGESTIONS"){
        return action.payload;
    }

    return citiesList;
};

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

const threeDaysWeather = (threeDaysWeather = null, action) => {
    if(action.type === "THREE_DAYS_WEATHER")
        return action.payload.list.slice(0,3);
    return threeDaysWeather;
};

export default combineReducers({
    citiesList: citiesList,
    focusedSuggestionListItem: focusedSuggestionListItem,
    currentLocationCoords: geolocation,
    currentDayWeather: currentDayWeather,
    threeDaysWeather: threeDaysWeather
});