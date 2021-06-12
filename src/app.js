const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express configs
const publicPathName = path.join(__dirname, '../public')
const viewsPathName = path.join(__dirname, '../templates/views')
const partialsPathName = path.join(__dirname, '../templates/partials')

const app = express()

//setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPathName)
hbs.registerPartials(partialsPathName)

//Setup static difrectory to use
app.use(express.static(publicPathName))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Aleks'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aleks'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help yourself',
        name: 'Aleks'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "Please provide an address."
        })
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(lat, long, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                address: req.query.address,
                forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search){ 
        return res.send({
            error: "Please provide search term"
        })
    } 
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Aleks', 
        errorMessage: 'Help article not there.'
    })
})

app.get('*', (req ,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Aleks', 
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server started running.')
})
