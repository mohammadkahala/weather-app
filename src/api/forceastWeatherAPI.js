//using 5 day weather forecast at => https://openweathermap.org/forecast5

// require('isomorphic-fetch');

const API_URL = "http://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "50677e3123bb05bfc94645d288d0545e";
const TIME_TO_UPDATE = 180;//minutes

let weatherState = {
    //location info
    cityId: undefined,
    cityName: undefined,
    countryCode: undefined,

    //react current weather state object variables
    componentState: {
        list: [],
        lastUpdated: undefined,
        currentLocation: undefined,
    },
};

function getCurrentLocation() {
    return `${weatherState.cityName}, ${weatherState.countryCode}`
}

function get3DaysWeather(searchParam, searchMethod) {
    return new Promise(function (resolve, reject) {
        let requestURL;
        if (searchMethod === "id" || searchMethod === "city")
            requestURL = getRequestURL(searchParam);
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

function isResponseCashed(cityID) {
    return cityID === weatherState.cityId && weatherState.response !== undefined;
}

function timeToUpdateElapsed() {
    let currentTime = new Date();
    return  weatherState.lastUpdate !== undefined && (currentTime - weatherState.lastUpdated > TIME_TO_UPDATE*60000);
}

function getRequestURL(cityID) {
    return `${API_URL}?id=${cityID}&APPID=${API_KEY}`;
}

function updateWeatherState(response, cityID) {
    //setting location variables
    weatherState.cityId = cityID;
    weatherState.cityName = response.city.name;
    weatherState.countryCode = response.city.country;

    weatherState.componentState.lastUpdated = new Date();
    weatherState.componentState.currentLocation = getCurrentLocation();

    let weather = {
        weatherIcon: {
            'clear': 0,
            'few clouds': 0,
            'scattered clouds': 0,
            'broken clouds': 0,
            'shower rain': 0,
            'rain': 0,
            'snow': 0,
            'mist': 0,
        },
        minTemp: [],
        maxTemp: [],
    };

    let dayWeather = [];
    let exploredDays = [];

    //setting avg temp and weather icon
    let list = response.list;
    for (let item of list) {
        if (!(exploredDays.includes(item.dt_txt.split(' ')[0]))){
            exploredDays.push(item.dt_txt.split(' ')[0]);

            if (exploredDays.length === 4){
                break;
            }

            dayWeather.push(JSON.parse(JSON.stringify(weather)));
        }

        dayWeather[exploredDays.length - 1].minTemp.push(item.main.temp_min);
        dayWeather[exploredDays.length - 1].maxTemp.push(item.main.temp_max);
        dayWeather[exploredDays.length - 1].weatherIcon[item.weather[0].main.toLowerCase()]++;
    }

    let obj = {
        weatherState : undefined,
        main: {
            tempMax: undefined,
            tempMin: undefined,
        },
        date: undefined,
    };

    let objString = JSON.stringify(obj);

    let i = 0;
    for (let item of dayWeather) {
        weatherState.componentState.list.push(JSON.parse(objString));

        weatherState.componentState.list[i].weatherState = getAvgWeatherState(item.weatherIcon);
        weatherState.componentState.list[i].main.tempMin = kelvinToCelsius(getMinTemp(item.minTemp));
        weatherState.componentState.list[i].main.tempMax = kelvinToCelsius(getMaxTemp(item.maxTemp));
        weatherState.componentState.list[i].date = dateToMonthDayFormat(new Date(exploredDays[i]));
        i++;
    }
}

function dateToMonthDayFormat(date) {
    let dateString = date.toDateString().split(' ');
    return dateString[1] + " " + dateString[2];
}

function getAvgWeatherState(obj){
    let max = 0;
    let weatherState;
    for (let key in obj) {
        if (obj[key] > max){
            max = obj[key];
            weatherState = key;
        }
    }
    return weatherState;
}

function getAvgTemp(array){
    let sum = 0;
    for(let temp of array){
        sum += temp;
    }
    return sum/array.length;
}

function getMinTemp(tempList) {
    let minTemp = 1000;
    for(let temp of tempList){
        if (temp < minTemp){
            minTemp = temp;
        }
    }
    return minTemp;
}

function getMaxTemp(tempList) {
    let maxTemp = 0;
    for(let temp of tempList){
        if (temp > maxTemp){
            maxTemp = temp;
        }
    }
    return maxTemp;
}

function kelvinToCelsius(temp) {
    return Math.round(temp - 273.15);
}

// get3DaysWeather("282239");

export {get3DaysWeather, getLastUpdatedTime, TIME_TO_UPDATE};