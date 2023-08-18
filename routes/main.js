const express = require('express')
const axios = require('axios')
const router = express.Router()
const {parseString} = require('xml2js')

router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/feed', async(req, res, next) => {
    const url = req.query.url

    const {data} = await axios({
        url,
        method: 'get'
    })

    parseString(data, (err, json) => {
        if(err) {
            return
        }
        const {rss} = json
        const {channel} = rss
        const payload = channel[0]
        res.json(payload)
    })

    /*
    res.json({
        data: 'este es el feed',
        url
    })
    */
})

router.get('/search', async (req, res, next) => {
    const url = 'https://itunes.apple.com/search?term=sports&country=US&media=podcast'    
    const {data} = await axios({
        url,
        method: 'get',
        options: {
            headers: {Accept: 'application/json'}
        }
    })
    const {results} = data
    const podcasts = results.map(podcast => {
        return {
            name: podcast.artistName,
            image: podcast.artworkUrl600,
            categories: podcast.genres,
            trackName: podcast.trackName,
            feed: podcast.feedUrl
        }
    })
    res.json({results})
})

router.post('/search', async (req, res, next) => {
    const searchTerm = req.body.term
    const url = `https://itunes.apple.com/search?term=${searchTerm}&country=US&media=podcast`    
    console.log('url: '+url)
    const {data} = await axios({
        url,
        method: 'get',
        options: {
            headers: {Accept: 'application/json'}
        }
    })
    const {results} = data
    const podcasts = results.map((podcast, idx) => {
        return {
            id: idx,
            name: podcast.artistName,
            image: podcast.artworkUrl600,
            categories: podcast.genres,
            trackName: podcast.trackName,
            feed: podcast.feedUrl
        }
    })
    res.json({podcasts})    
})

/*
router.get('/react', (req, res, next) => {
    res.render('index')
})
*/
module.exports = router