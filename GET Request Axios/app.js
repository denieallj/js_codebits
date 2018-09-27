const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for.",
            string: true
        }
    })
    .help()
    .alias('help', "h")
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=%20${encodedAddress}&key=AIzaSyDXD_sLVnKn4NxZCql2bcWsUCsF4a3WiqA`;

axios.get(geocodeURL).then(
    (response) => {
        if (response.data.status === 'ZERO_RESULTS') {

            // After throw the codes below will never run
            throw new Error("Nothing found!");

        } else if (response.data.status === 'OK') {
            console.log("\nFormatted Address:\n" + response.data.results[0].formatted_address);
            console.log("\nCoordinates:\n" + response.data.results[0].geometry.location.lat + ", " + response.data.results[0].geometry.location.lng);

            let weatherURL = `https://api.darksky.net/forecast/14351cc4a94fc3cb6711f2b269c655b0/${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lng}?units=si`

            return axios.get(weatherURL);
        }
    }
).then(
    (res) => {
        if (res.status == 200) {
            let temp = "Temperature is: " + res.data.currently.temperature + " °C";
            let weatherSummary = "Weather summary: " + res.data.currently.summary;
            let rain = "Chance of percipitation: " + res.data.currently.precipProbability;
            let windSpeed = "Wind speed: " + res.data.currently.windSpeed + " km/h";

            let x = Math.max(temp.length, weatherSummary.length, rain.length, windSpeed.length);
            let decoString = "";

            for (let i = 1; i <= x; i++) {
                 decoString = decoString + "-";
            }

            console.log("\n" + decoString + "\n");
            console.log(temp);
            console.log(weatherSummary);
            console.log(rain);
            console.log(windSpeed);
            console.log("\n" + decoString);
        } else {
            console.log("Unable to fetch weather forecast!");
        }
    }
).catch(
    (error) => {
        if (error.code === 'ENOTFOUND') {
            console.log("Unable to connect to API server!");
        } else {
            console.log(error.message);
        }
    }
);
