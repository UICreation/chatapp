var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var path = require('path');
const port = 3001;
require('dotenv').config({
    path: __dirname + '/.env'
})
// app.use(express.static(__dirname))
// app.listen(3001, () => 
// {
//     console.log('server is listening on port')
// })

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.use(express.static(path.join(__dirname, 'src')))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})
app.get('/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({ name: user }, (err, message) => {
        res.send(message)
    })
})
app.post('/messages', (req, res) => {
    var message = new Message(req.body)
    message.save()
        .then(response => {
            if (response.message == 'badword') {
                Message.deleteOne({ _id: response._id }, err => {
                    console.log('item deleted')
                })
                // console.log(response)
            }
        })
    io.emit('message', req.body)
    res.sendStatus(200)


})

app.get('/about', () => {
    console.log('about render')
})
// app.delete('/messages', (req, res) => {
//     var message = new Message({_id: req._id})
//     message.save()
//     .then(res => {
//         console.log('item deleted!', res)
//     })
//     io.emit('message', req.body)
//     res.sendStatus(200)

// })
io.on('connection', socket => {
    // console.log('a user connected')
})

mongoose.connect(process.env.dbURL, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
    console.log('mongodb connected!')
})
// app.get('/', (req, res) => res.send('hello shivam kumar'))
// app.get('/about', (req, res) => res.send('call about page'))
http.listen(port, () => console.log(
    `Example app listen on port ${port}`
))