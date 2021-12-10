"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarEstadoDevolucion = exports.getDevolucionMasAntigua = exports.insertarDevolucion = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function insertarDevolucion(data) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const devoluciones = database.collection('devoluciones');
    const resultado = await devoluciones.insertOne(data);
    return resultado;
}
exports.insertarDevolucion = insertarDevolucion;
async function getDevolucionMasAntigua() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const devolucion = database.collection('devoluciones');
    const resultado = await devolucion.findOne({ enviado: false }, { sort: { timestamp: 1 } });
    console.log("hey eze", resultado);
    return resultado;
}
exports.getDevolucionMasAntigua = getDevolucionMasAntigua;
async function actualizarEstadoDevolucion(devolucion) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const sincroFichajes = database.collection('sincro-fichajes');
    const resultado = sincroFichajes.updateOne({ _id: devolucion._id }, { $set: {
            "enviado": devolucion.enviado,
            "intentos": devolucion.intentos,
            "comentario": devolucion.comentario
        } });
    return resultado;
}
exports.actualizarEstadoDevolucion = actualizarEstadoDevolucion;
//# sourceMappingURL=devoluciones.mongodb.js.map