// using request library
const request = require('request');

var findLocation = (address) => {

    return new Promise((resolve, reject) => {

        request({

            url: `https://maps.googleapis.com/maps/api/geocode/json?address=%20${address}&key=AIzaSyDXD_sLVnKn4NxZCql2bcWsUCsF4a3WiqA`,
            json: true

        }, (error, response, body) => {

            if (error == null) {
                if (body.status === "OK") {

                    let resObj = {
                        fAddress: body.results[0].formatted_address,
                        latitude: body.results[0].geometry.location.lat,
                        longitude: body.results[0].geometry.location.lng
                    };

                    resolve(resObj);

                } else {

                    reject(body.error_message);

                }

            } else {

                reject("Unable to connect to Google's server");

            }

        });


    });

};

// To find weather using Coordinates from findLocation() result
var fetchWeather = (latitude, longitude) => {

    return new Promise((resolve, reject) => {

        request(`https://api.darksky.net/forecast/14351cc4a94fc3cb6711f2b269c655b0/${latitude},${longitude}?units=si`, function (error, response, body) {

            if (error) {
                reject("Unable to connect to Forecast.io server");
            } else {

                if (response.statusCode === 200) {

                    let temp = JSON.parse(body);

                    let tempObj = {
                        temperature: temp.currently.temperature + " °C",
                        summary: temp.currently.summary
                    }

                    resolve(tempObj);

                } else {

                    reject("Unable to fetch the weather");

                }

            }

        });

    });

};

findLocation("No. 15, Lorong Bukit Setongkol 61, 25200, Kuantan, Pahang").then(
    (res) => {
        console.log(`\nFormated Address:\n${res.fAddress}`);
        console.log(`\nCoordinates:\n${res.latitude}, ${res.longitude}`);

        return fetchWeather(res.latitude, res.longitude);
    }
).then(
    (res) => {
        console.log(`\nTemperature:\n${res.temperature}`);
        console.log(`\nSummary:\n${res.summary}`);
    }
).catch(
    (msg) => {
        console.log(msg);
    }
);
