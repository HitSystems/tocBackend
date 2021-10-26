"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertarDevolucion = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function insertarDevolucion(data) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const devoluciones = database.collection('devoluciones');
    const resultado = await devoluciones.insertOne(data);
    return resultado;
}
exports.insertarDevolucion = insertarDevolucion;
//# sourceMappingURL=devoluciones.mongodb.js.map