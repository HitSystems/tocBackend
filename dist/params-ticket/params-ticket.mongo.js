"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParamsTicket = exports.insertarParametrosTicket = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function insertarParametrosTicket(data) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const paramTickets = database.collection('parametros-ticket');
    const resultado = await paramTickets.insertMany(data);
    return resultado;
}
exports.insertarParametrosTicket = insertarParametrosTicket;
async function getParamsTicket() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const paramTickets = database.collection('parametros-ticket');
    const arrayResult = await (await paramTickets.find({})).toArray();
    return arrayResult;
}
exports.getParamsTicket = getParamsTicket;
//# sourceMappingURL=params-ticket.mongo.js.map