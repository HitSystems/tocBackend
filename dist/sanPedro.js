"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSocket = exports.socket = void 0;
const io = require("socket.io-client");
const socket = io('http://54.74.52.150:3001');
exports.socket = socket;
function emitSocket(canal, datos = null) {
    if (socket.connected) {
        socket.emit(canal, datos);
    }
}
exports.emitSocket = emitSocket;
//# sourceMappingURL=sanPedro.js.map