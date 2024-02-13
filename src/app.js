const express = require('express')
const path = require('path')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()
const hbs = require('hbs')

const port = process.env.PORT || 3000

// Defines Path for Express Config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views path 
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


// Setup static dir to serve
app.use(express.static(publicDirPath))

// root
app.get('/', (req, res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Rahul'
    })
})

// root/about
app.get('/about', (req, res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Rahul Ojha'
    })
})


// root/help
app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Get Help',
        helpText : 'There are some Help!',
        name : 'Rahul Ojha'
    })
})


// root/weather
app.get('/weather',(req,res) => {
    // query string checking if address is provided
    if (!req.query.address) {
        return res.send({
            error : 'No Address is Provided'
        })
    }
    else {
        geocode(req.query.address,(error, {latitude, longitude ,location} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            } else {
                forcast(latitude, longitude, (error, data) => {
                    if (error) {
                        return res.send({
                            error
                        })
                    } else {
                        return res.send({
                            location,
                            latitude,
                            longitude,
                            forcast : data
                        })
                    }
                })
            }
        })
    }
})

// help error

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title :'404',
        errorCode : 'help article not found',
        name : 'Rahul Ojha'
    })
})


// anything else
app.get('*', (req, res) => {
    res.render('error404', {
        title :'404 ',
        errorCode : 'Page not available',
        name : 'Rahul Ojha'
    })
})

// to make server start
app.listen(port, () => {
    console.log('Server is Running at ' + port)
})
