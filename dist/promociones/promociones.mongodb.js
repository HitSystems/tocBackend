"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromociones = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function getPromociones() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const promociones = database.collection('promociones');
    const resultado = await (await promociones.find()).toArray();
    return resultado;
}
exports.getPromociones = getPromociones;
//# sourceMappingURL=promociones.mongodb.js.map