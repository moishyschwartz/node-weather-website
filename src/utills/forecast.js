const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=7c381f9db7f2613e8f0056a74040ec6a&query=' +lat + ',' + long +'&units=f';
    request({url, json: true}, (error, {body}) => {
    if ( error ) {
        callback('Unable to conact to network', undefined)
    } else if (body.error) {
        callback('No result found', undefined)
    } else {
        callback(undefined, {
            tamp: body.current.temperature,
            forcast: body.current.weather_descriptions[0]
        })
    }
 })
}

module.exports = forecast