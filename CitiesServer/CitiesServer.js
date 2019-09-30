const http = require('http');
let fs = require('fs');

let fileData = fs.readFileSync('./cities.json');
let cityFullData = fs.readFileSync('./city.list.json');

let citiesList = JSON.parse(fileData);
let fullCityData = JSON.parse(cityFullData);

function searchCities(cityName, maxNumberOfResults) {
    let results = [];

    if (cityName === undefined)
        return results;

    for (let city of citiesList[cityName[0].toLowerCase()]) {
        if (city.toLowerCase().startsWith(cityName.toLowerCase()))
            results.push(city);

        if (results.length > maxNumberOfResults)
            break;
    }

    return JSON.stringify(results, null, 2);
}

function getCityID(cityName) {
    for (let key in fullCityData) {
        let city = fullCityData[key];
        if (city.name.startsWith(cityName.split(',')[0]))
            return city.id;
    }
}

let server = http.createServer(function (req, res) {
    if (req.method === 'GET' && req.url.indexOf('/cityName') !== -1) {
        let cityName = req.url.split('=')[1];
        if (cityName.includes('%')) {
            cityName = cityName.replace(/%/g, " ");
        }

        let results = searchCities(cityName, 10);

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.writeHead(200, {"Access-Control-Allow-Origin" :"http://localhost:3000"});
        res.end(results);
    }
    if (req.method === 'GET' && req.url.indexOf('/cityid') !== -1){
        let cityName = req.url.split('=')[1];
        if (cityName.includes('%')) {
            cityName = cityName.replace(/%/g, " ");
        }

        console.log(cityName);
        let cityID = getCityID(cityName);
        console.log(cityID);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.writeHead(200, {"Access-Control-Allow-Origin" :"http://localhost:3000"});
        res.end((String)(cityID));
    }
});

server.listen(8080).on('listening', function() {
    console.log('HTTP listening on port 8080');
});


// let s = searchCities("Ram",10);
// let h;

// let t = getCityID('Al Bayda City, YE');
// console.log(t);