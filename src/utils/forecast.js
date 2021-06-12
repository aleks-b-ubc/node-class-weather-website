const request = require('postman-request')

const baseUrl = 'http://api.weatherstack.com/current?access_key=5236b1ee0e51ec7ca540d4a87b17f32e'

const forecast = (lat, long, callback) => {
    
    const location = '&query='+lat+','+long
    const url = baseUrl + location

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback(error)
        } else if (body.error) {
            callback('Error: ' + body.error.info)
        } else {
            const current = body.current

            // callback(undefined, {
            //     weatherDescription: current.weather_descriptions[0], 
            //     currentTemperature: current.temperature,
            //     feelsLike: current.feelslike
            // })
            const weatherString = 'Weather is: '+current.weather_descriptions[0]+'. Temperature is: '+current.temperature+'C. Feels like: '+current.feelslike+'C.'
            callback(undefined, weatherString)
        }
    })
}

module.exports = forecast


