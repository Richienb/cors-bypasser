const express = require('express')
const app = express()
const request = require('request')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/', (_req, res) => {
    res.sendFile(__dirname + 'index.html')
})

const requestParams = (url, type, body) => ({
    url,
    gzip: true,
    method: type ? type : "GET",
    body,
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3163.100 Safari/537.36"
    }
})

app.get('/bypass/*', (req, res) => {
    request(requestParams(req.path.substr(8), "GET"), (err, _, body) => {
        res.send(body)
    })
})

const listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`)
})
