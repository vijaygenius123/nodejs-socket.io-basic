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

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html')
})

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css.html')
})

app.get('/python', (req, res) => {
    res.sendFile(__dirname + '/public/python.html')
})


io.on('connection', (socket) => {

    socket.on('join', ({ room }) => {
        socket.join(room);
        io.in(room).emit('message', `New User Joined ${room} Room`)
    })

    socket.on('message', ({ msg, room }) => {
        io.in(room).emit('message', msg);
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User Disconnected');
    })
})

