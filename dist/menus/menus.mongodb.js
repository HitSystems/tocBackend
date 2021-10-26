"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTecladoMain = exports.getMenus = void 0;
const mongodb_1 = require("../conexion/mongodb");
async function getMenus() {
    const database = (await mongodb_1.conexion).db('tocgame');
    const menus = database.collection('menus');
    const resultado = await (await menus.find()).toArray();
    return resultado;
}
exports.getMenus = getMenus;
async function getTecladoMain(nombreMenu) {
    const database = (await mongodb_1.conexion).db('tocgame');
    const teclas = database.collection('teclas');
    const resultado = await (await teclas.find({ nomMenu: nombreMenu })).toArray();
    return resultado;
}
exports.getTecladoMain = getTecladoMain;
//# sourceMappingURL=menus.mongodb.js.map