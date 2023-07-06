const path = require('path')
const express = require('express')
const hbs = require('hbs')

const gocode = require('./utills/gocode.js')
const forecast = require('./utills/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlbars engine and  views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'weather app',
        name:'Moishy'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name:'Moishy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'No help availible',
        title:  'Help',
        name: 'Moishy'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    gocode(req.query.address,(error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({error, })
        }
        forecast(lat, long, (error, {tamp, forcast}) => {
            if (error) {
                return res.send({error,})
            }

            res.send({
                forcast,
                tamp, 
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.name){
      return  res.send({
            error: 'U must provide a search '
        })
    }
    console.log(req.query.name)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('_404', {
        massege: 'Help artical not found',
        title:  '404',
        name: 'Moishy'
    })

})

app.get('*', (req, res) => {
    res.render('_404', {
        massege: 'Page not found',
        title:  '404',
        name: 'Moishy'
    })
})

app.listen(port, () => {
    console.log('server is up on port' + port)
})