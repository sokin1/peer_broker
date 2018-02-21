var express = require('express')
var app = express()
var ExpressPeerServer = require('peer').ExpressPeerServer
var path = require('path')

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'test_client.html'))
})

var server = app.listen(9000)

var options = {
    debug: true
}

const ps = ExpressPeerServer(server, options)

app.use('/peer', ps)

var peer = []

ps.on('connection', id => {
    peer.push(id)
    console.log(id)
    console.log(ps._clients)
})

ps.on('disconnect', id => {
    peer.remove(peer.indexOf(id))
})