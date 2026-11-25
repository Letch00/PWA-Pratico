let AuthAPI = require('./server/auth');
let RoomAPI = require('./server/room');
let PointAPI = require('./server/pointOfInterest');
let VisitsAPI = require('./server/visits');
let OrderAPI = require('./server/order');
const express = require('express');

function init (io) {
    let api = express();

    api.use('/auth', AuthAPI());
    api.use('/rooms', RoomAPI());
    api.use('/points', PointAPI());
    api.use('/visits', VisitsAPI());
    api.use('/orders', OrderAPI(io));

    return api;
}

module.exports = {
    init: init,
}