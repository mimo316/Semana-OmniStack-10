const socketio = require ('socket.io');
const pareseStringAsArray = require('./utils/pareseStringAsArray');
const calculateDistance = require ('./utils/calculateDistance');


const connections = [];
let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        console.log(socket.id);
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs:pareseStringAsArray(techs),
        });

        // setTimeout(() => {
        //     socket.emit('message', 'Hello OmniStack')
        // }, 3000)
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(item => techs.includes(item));
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}