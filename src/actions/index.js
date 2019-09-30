import {getCurrentWeather} from "../api/currentWeatherAPI";
import {getThreeDaysWeather} from "../api/forceastWeatherAPI";

export const getCitiesSuggestions = (searchParameter) => dispatch => {
      if (!searchParameter){
          dispatch({ type: "CITIES_SUGGESTIONS", payload: []});
          return;
      }

      fetch(`http://localhost:8080/cityName=${searchParameter.replace(' ','%')}`, { mode: 'cors' }).then((response) => {
          return response.json();
      }).then((suggestionList) => {
          dispatch({
              type: "CITIES_SUGGESTIONS",
              payload: suggestionList
          });
      }).catch((err) => console.log(err));
};

export const navigateSuggestionList = (event) => (dispatch, getState) => {
    const state = getState();
    if (event === "ArrowUp"){
        dispatch({
            type: "ARROW_UP",
            payload: state.citiesList.length
        })
    }else {
        dispatch({
            type: "ARROW_DOWN",
            payload: state.citiesList.length
        })
    }
};

export const getCurrentLocation = () => dispatch => {
    navigator.geolocation.getCurrentPosition((position) => {
        dispatch({
            type: 'GEOLOCATION',
            payload: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        });

        getWeatherData(
            dispatch,
            `${position.coords.latitude},${position.coords.longitude}`,
            'location'
        );
    }, () => {
        dispatch({
            type: 'GEOLOCATION',
            payload: null
        });
    })
};

export const getCurrentDayWeather = () => (dispatch, getState) => {
    const state = getState();
    getCurrentWeather(
        `${state.currentLocationCoords.latitude},${state.currentLocationCoords.longitude}`,
        'location')
    .then((response) => {
        dispatch({
            type: "CURRENT_WEATHER",
            payload: response
        })
    });
};

export const getThreeDayWeather = () => (dispatch, getState) => {
    const state = getState();
    getThreeDaysWeather(
        `${state.currentLocationCoords.latitude},${state.currentLocationCoords.longitude}`,
        'location')
    .then((response) => {
        dispatch({
            type: "THREE_DAYS_WEATHER",
            payload: response
        })
    });
};


export const getCityWeather = () => (dispatch, getState) => {
    const state = getState();
    const cityName = state.citiesList[state.focusedSuggestionListItem];

    if (!cityName || cityName === "")
        return;

    dispatch({
        type: 'CURRENT_WEATHER',
        payload: {
            "weatherState": "Loading",
            "main": {
                "temp": 0,
                "tempMax": 0,
                "tempMin": 0,
                "humidity": 0
            },
            "lastUpdated": "Loading",
            "currentLocation": "Loading"
        }
    });

    getWeatherData(
        dispatch,
        cityName.replace(' ', ''),
        'city'
    );
};

function getWeatherData(dispatch, searchParam, searchMethod){
    getCurrentWeather(searchParam, searchMethod)
        .then((response) => {
            dispatch({
                type: "CURRENT_WEATHER",
                payload: response
            })
        });

    getThreeDaysWeather(searchParam, searchMethod)
        .then((response) => {
            dispatch({
                type: "THREE_DAYS_WEATHER",
                payload: response
            })
        });
}
