// using current weather API => https://openweathermap.org/current
// require('isomorphic-fetch');

const API_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "50677e3123bb05bfc94645d288d0545e";
const TIME_TO_UPDATE = 10;//minutes

let weatherState = {
    //location info
    cityId: undefined,
    cityName: undefined,
    countryCode: undefined,

    //react current weather state object variables
    componentState: {
        weatherState : "sunny",
        main: {
            temp: undefined,
            tempMax: undefined,
            tempMin: undefined,
            humidity: undefined,
        },
        lastUpdated: undefined,
        currentLocation: undefined,
    },
};

function getCurrentLocation() {
    return `${weatherState.cityName}, ${weatherState.countryCode}`
}

function getCurrentWeather(searchParam, searchMethod) {
    return new Promise(function (resolve, reject) {
        let requestURL;
        if (searchMethod === "id")
            requestURL = getRequestURL(searchParam);
        else if(searchMethod === "city")
            requestURL = `${API_URL}?q=${searchParam.split(',')}&APPID=${API_KEY}`;
        else
            requestURL = getRequestURLWithLocation(searchParam);

        fetch(requestURL)
            .then(function (response) {
                return response.json();
            }).then((jsonBody) => {
            updateWeatherState(jsonBody, searchParam);
            resolve(weatherState.componentState);
        })
    });
}

function getRequestURLWithLocation(searchParm) {
    let latitude = searchParm.split(',')[0];
    let longitude = searchParm.split(',')[1];

    return `${API_URL}?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;
}

function getLastUpdatedTime() {
    return weatherState.componentState.lastUpdated;
}

function getRequestURL(cityID) {
    return `${API_URL}?id=${cityID}&APPID=${API_KEY}`;
}

function updateWeatherState(response, cityID) {
    weatherState.cityId = cityID;

    //setting location variables
    weatherState.cityName = response.name;
    weatherState.countryCode = response.sys.country;

    //setting react current weather state object variables
    weatherState.componentState.weatherState = response.weather[0].main;
    weatherState.componentState.main.temp = kelvinToCelsius(response.main.temp);
    weatherState.componentState.main.tempMax = kelvinToCelsius(response.main.temp_max);
    weatherState.componentState.main.tempMin = kelvinToCelsius(response.main.temp_min);
    weatherState.componentState.main.humidity = response.main.humidity;
    weatherState.componentState.lastUpdated = new Date();
    weatherState.componentState.currentLocation = getCurrentLocation();
}

function kelvinToCelsius(temp) {
    return Math.round(temp - 273.15);
}

export {getCurrentWeather, getCurrentLocation, getLastUpdatedTime, TIME_TO_UPDATE};