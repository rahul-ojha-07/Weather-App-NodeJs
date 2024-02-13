const request = require('request')
const chalk = require('chalk')
require('dotenv').config()

const api_key = process.env.API_KEY
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=' + api_key +'&q=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + "&aqi=no";
    // console.log(url)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Error : could not connect to server',undefined)
            // console.log(chalk.red.inverse.bold("ERROR:") + "Could not connect to server!")
        } else if (body.error) {
            callback('Error : No location found',undefined)
            // console.log(chalk.red.bold.inverse("ERROR:") + "Unknown location!")
        } else {
            const {current ,daily}= body
            // console.log(url);
            // console.log(body)
            callback(undefined,'The temperature is ' + current.temp_c )
        }
    })
}


module.exports = forecast
