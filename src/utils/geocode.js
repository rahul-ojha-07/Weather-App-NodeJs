const request = require('request')
const chalk = require('chalk')


//get the co-ordinates of a city by name
const geocode = (cityName,callback) => {
    //url of mapbox with api-key
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(cityName) + ".json?access_token=pk.eyJ1IjoiY3JhenlnaG91bDA3IiwiYSI6ImNrMHRjZGV2cjBiMWkzZHAzNmx5Mmw4NncifQ.7kKd8_O_iMSbz_QlQ7H0qQ"
    //making request to the server of mapbox.com
    // console.log(url)
    request({url, "json" : true}, (error,response) =>{
        if (error) { //check for network related 
            // console.log(error);
            callback('could not coonect to location server',undefined)
            // console.log(chalk.red.inverse.bold("ERROR:") + "Could not connect to server!")
        } else if (response.body.features.length === 0) { //check for bad url
            // console.log('unable to find loction please try another place')
            callback('Unable to find location please try again anothr location',undefined)
        } else { //if no error or issue are there then fetch co-ordinates form response
            // const 
            const body = response.body
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
