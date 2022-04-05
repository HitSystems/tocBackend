"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articulosInstance = exports.Articulos = void 0;
const schArticulos = __importStar(require("./articulos.mongodb"));
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
        if (this.getEstadoTarifaEspecial() != true) {
            return await schArticulos.getInfoArticulo(idArticulo);
        }
        else {
            return await schArticulos.getInfoArticuloTarifaEspecial(idArticulo);
        }
    }
    insertarArticulos(arrayArticulos, esTarifaEspecial = false) {
        return schArticulos.insertarArticulos(arrayArticulos, esTarifaEspecial).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    setSuplemento(suplemento) {
        console.log(suplemento);
    }
    async getSuplementos(suplementos) {
        return await schArticulos.getSuplementos(suplementos);
    }
    async editarArticulo(id, nombre, precioBase, precioConIva) {
        const resultado = await schArticulos.editarArticulo(id, nombre, precioBase, precioConIva);
        console.log(resultado);
        return resultado;
    }
}
exports.Articulos = Articulos;
const articulosInstance = new Articulos();
exports.articulosInstance = articulosInstance;
//# sourceMappingURL=articulos.clase.js.map