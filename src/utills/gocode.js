const request = require('postman-request')

const gocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9pc2h5ODU5NyIsImEiOiJjbGpoYWE5OGwwZXJzM2NxbGs2czN5N25yIn0.nUXbhvRHNUGMMJd67LX1NA&limit=1'
    request({url, json: true},(error, {body}) =>{
        if (error) {
            callback('Unable to conact to network', undefined)
        } else if (body.features.length === 0) {
            callback('No result found', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = gocode