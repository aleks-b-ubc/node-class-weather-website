const request = require('postman-request')


const geocode = (address, callback) => {
    const mapboxToken = 'access_token=pk.eyJ1IjoiYWxla3MtYi11YiIsImEiOiJja3ByMzRjN24wcG45MnZzNDZybnpkaDdvIn0.MYwZ45quhBfsu2xgLVlzyA'
    const mapboxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?'

    const url = mapboxBaseUrl + mapboxToken

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback(error)
        } else if(body.features.length === 0) {
            callback('Error retreiving location data')
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode