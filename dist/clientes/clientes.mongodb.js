"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClieneteByID = exports.buscar = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function buscar(busqueda) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const clientes = database.collection('clientes');
    const resultado = await clientes.find({ $or: [{ "nombre": { '$regex': new RegExp(busqueda, 'i') } }, { "tarjetaCliente": busqueda }] }, { limit: 20 });
    const arrayResult = await resultado.toArray();
    return arrayResult;
}
exports.buscar = buscar;
async function getClieneteByID(idCliente) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const clientes = database.collection('clientes');
    const resultado = await clientes.findOne({ id: idCliente });
    return resultado;
}
exports.getClieneteByID = getClieneteByID;
//# sourceMappingURL=clientes.mongodb.js.map