"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tecladoInstance = exports.TecladoClase = void 0;
const schTeclas = require("./teclado.mongodb");
class TecladoClase {
    insertarTeclas(arrayTeclas) {
        return schTeclas.insertarTeclas(arrayTeclas).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
exports.TecladoClase = TecladoClase;
exports.tecladoInstance = new TecladoClase();
//# sourceMappingURL=teclado.clase.js.map