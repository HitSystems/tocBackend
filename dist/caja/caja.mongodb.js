"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevoItemSincroCajas = exports.setInfoCaja = exports.getInfoCaja = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function getInfoCaja() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const caja = database.collection('cajas');
    const resultado = await caja.findOne({ _id: "CAJA" });
    return resultado;
}
exports.getInfoCaja = getInfoCaja;
async function setInfoCaja(data) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const caja = database.collection('cajas');
    const resultado = await caja.replaceOne({
        _id: "CAJA"
    }, data, { upsert: true });
    return resultado;
}
exports.setInfoCaja = setInfoCaja;
async function nuevoItemSincroCajas(unaCaja) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const sincroCajas = database.collection('sincro-cajas');
    const resultado = await sincroCajas.insertOne(unaCaja);
    return resultado;
}
exports.nuevoItemSincroCajas = nuevoItemSincroCajas;
//# sourceMappingURL=caja.mongodb.js.map