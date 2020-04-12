const app = require('express')();
const server = require('http').Server(app)
const io = require('socket.io')(server);
const port = 3000


server.listen(port, () => {
    console.log('Server listening port:', port);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    console.log('User Connected')
    socket.emit('message', 'Hello, How Are You?');
    socket.on('another event', (event) => {
        console.log(event)
    })
})

