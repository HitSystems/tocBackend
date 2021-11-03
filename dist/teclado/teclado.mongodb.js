"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertarTeclas = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function insertarTeclas(arrayTeclas) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const teclas = database.collection('teclas');
    const resultado = await teclas.insertMany(arrayTeclas);
    return resultado;
}
exports.insertarTeclas = insertarTeclas;
//# sourceMappingURL=teclado.mongodb.js.map