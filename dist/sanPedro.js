"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const io = require("socket.io-client");
const socket = io('http://54.74.52.150:3001');
exports.socket = socket;
socket.on('resSincroTickets', (data) => {
    console.log("Llega respuesta: ", data);
});
//# sourceMappingURL=sanPedro.js.map