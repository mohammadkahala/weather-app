import {getCurrentWeather} from "../api/currentWeatherAPI";

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
    }, () => {
        dispatch({
            type: 'GEOLOCATION',
            payload: null
        });
    })
};

export const getCurrentDayWeather = () => (dispatch, getState) => {
    let state = getState();
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
