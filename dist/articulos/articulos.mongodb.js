"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoArticuloTarifaEspecial = exports.getInfoArticulo = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function getInfoArticulo(idArticulo) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const articulos = database.collection('articulos');
    const resultado = await articulos.findOne({ _id: idArticulo });
    return resultado;
}
exports.getInfoArticulo = getInfoArticulo;
async function getInfoArticuloTarifaEspecial(idArticulo) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const articulos = database.collection('ArticulosTarifaEspecial');
    const resultado = await articulos.findOne({ _id: idArticulo });
    return resultado;
}
exports.getInfoArticuloTarifaEspecial = getInfoArticuloTarifaEspecial;
//# sourceMappingURL=articulos.mongodb.js.map