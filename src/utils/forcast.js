const request = require('request')
const chalk = require('chalk')


const forcast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/24771cb0b5d76ac9e93c2e42d16dfab5/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + "?units=si"
    // console.log(url)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Error : could not connect to server',undefined)
            // console.log(chalk.red.inverse.bold("ERROR:") + "Could not connect to server!")
        } else if (body.error) {
            callback('Error : No location found',undefined)
            // console.log(chalk.red.bold.inverse("EROOR:") + "Unknown location!")
        } else {
            const {currently ,daily}= body
            callback(undefined,currently.summary + '. The temprature is ' + currently.temperature + ' degree C. Chance of rain is ' + currently.precipProbability + ' %.')
        }
    })
}


module.exports = forcast