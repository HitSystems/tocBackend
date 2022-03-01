"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCesta = exports.updateIdCestaTrabajador = exports.eliminarCesta = exports.borrarCesta = exports.getAllCestas = exports.getCestaConcreta = exports.getUnaCesta = void 0;
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
    let resultado = await cesta.findOne({ _id: idCesta });
    if (!resultado)
        resultado = await cesta.findOne({ _id: idCesta.toString() });
    return resultado;
}
exports.getCestaConcreta = getCestaConcreta;
async function getAllCestas() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await (await cesta.find()).toArray();
    console.log(resultado);
    return resultado;
}
exports.getAllCestas = getAllCestas;
async function borrarCesta(idCesta) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const tiposIva = {
        base1: 0,
        base2: 0,
        base3: 0,
        valorIva1: 0,
        valorIva2: 0,
        valorIva3: 0,
        importe1: 0,
        importe2: 0,
        importe3: 0,
    };
    const resultado = await cesta.updateOne({ _id: idCesta }, { $set: { 'lista': [], 'tiposIva': tiposIva } }, { upsert: true });
    return resultado;
}
exports.borrarCesta = borrarCesta;
async function eliminarCesta(nombre) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resultado = await cesta.deleteMany({ _id: nombre.toString() });
    return resultado;
}
exports.eliminarCesta = eliminarCesta;
async function updateIdCestaTrabajador(id) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const cesta = database.collection('cestas');
    const resTemp = await cesta.findOne({ nombreCesta: id });
    resTemp._id = id;
    resTemp.nombreCesta = `Trabajador ${id}`;
    const resultado = await cesta.insertOne(resTemp);
    await cesta.deleteMany({ nombreCesta: id });
    return resultado;
}
exports.updateIdCestaTrabajador = updateIdCestaTrabajador;
async function setCesta(cesta) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const unaCesta = database.collection('cestas');
    const resultado = await unaCesta.replaceOne({ _id: cesta._id }, {
        tiposIva: cesta.tiposIva,
        lista: cesta.lista,
        nombreCesta: (cesta.nombreCesta != undefined || cesta.nombreCesta != '') ? (cesta.nombreCesta) : ('PRINCIPAL'),
        idCestaSincro: (cesta.idCestaSincro != undefined || cesta.idCestaSincro != '') ? (cesta.idCestaSincro) : (''),
        regalo: (cesta.regalo != undefined) ? (cesta.regalo) : (false)
    }, { upsert: true });
    return resultado;
}
exports.setCesta = setCesta;
//# sourceMappingURL=cestas.mongodb.js.map