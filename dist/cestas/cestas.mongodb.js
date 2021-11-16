"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCesta = exports.borrarCesta = exports.getAllCestas = exports.getCestaConcreta = exports.getUnaCesta = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function getUnaCesta() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await cesta.findOne();
    return resultado;
}
exports.getUnaCesta = getUnaCesta;
async function getCestaConcreta(idCesta) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await cesta.findOne({ _id: idCesta });
    return resultado;
}
exports.getCestaConcreta = getCestaConcreta;
async function getAllCestas() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await (await cesta.find()).toArray();
    return resultado;
}
exports.getAllCestas = getAllCestas;
async function borrarCesta(idCesta) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await cesta.deleteOne({ _id: idCesta });
    return resultado;
}
exports.borrarCesta = borrarCesta;
async function setCesta(cesta) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const unaCesta = database.collection('cestas');
    const resultado = await unaCesta.replaceOne({ _id: cesta._id }, {
        tiposIva: cesta.tiposIva,
        nombre: cesta.nombre,
        lista: cesta.lista,
        regalo: (cesta.regalo != undefined) ? (cesta.regalo) : (false)
    }, { upsert: true });
    return resultado;
}
exports.setCesta = setCesta;
//# sourceMappingURL=cestas.mongodb.js.map