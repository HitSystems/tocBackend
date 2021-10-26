"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articulosInstance = exports.Articulos = void 0;
const schArticulos = require("./articulos.mongodb");
class Articulos {
    constructor() {
        this.estadoTarifaVIP = false;
    }
    setEstadoTarifaEspecial(payload) {
        this.estadoTarifaVIP = payload;
    }
    getEstadoTarifaEspecial() {
        return this.estadoTarifaVIP;
    }
    async getInfoArticulo(idArticulo) {
        if (!this.getEstadoTarifaEspecial()) {
            return await schArticulos.getInfoArticulo(idArticulo);
        }
        else {
            return await schArticulos.getInfoArticuloTarifaEspecial(idArticulo);
        }
    }
}
exports.Articulos = Articulos;
const articulosInstance = new Articulos();
exports.articulosInstance = articulosInstance;
//# sourceMappingURL=articulos.clase.js.map