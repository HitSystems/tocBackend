import { ticketsInstance } from "./tickets/tickets.clase";

const io = require("socket.io-client");
const socket = io('http://54.74.52.150:3001');

socket.on('resSincroTickets', (data) => {
    console.log("Llega respuesta: ", data);
});

export { socket };