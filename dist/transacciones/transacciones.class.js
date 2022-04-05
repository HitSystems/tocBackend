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
exports.transaccionesInstance = void 0;
const cestas_clase_1 = require("../cestas/cestas.clase");
const cestas_interface_1 = require("../cestas/cestas.interface");
const schTransacciones = __importStar(require("./transacciones.mongodb"));
class TransaccionesClass {
    crearTransaccion(cesta, total, idCliente) {
        return schTransacciones.crearTransaccion(cesta, total, idCliente).then((res) => {
            if (res.acknowledged) {
                return { error: false, insertedId: res.insertedId };
            }
            else {
                return { error: true, mensaje: 'Error, no se ha podido insertar la transacción' };
            }
        }).catch((err) => {
            console.log(err.message);
            return { error: true, mensaje: 'Error en CATCH transacciones.class/crearTransaccion' };
        });
    }
    getTransaccionById(idTransaccion) {
        return schTransacciones.getTransaccionById(idTransaccion).then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }
    setPagada(idTransaccion) {
        return schTransacciones.setPagada(idTransaccion).catch((err) => {
            console.log(err);
            return false;
        });
    }
    getUltimaTransaccion() {
        return schTransacciones.getUltimaTransaccion().then((res) => {
            if (res.length == 1) {
                return res[0];
            }
            return null;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }
}
exports.transaccionesInstance = new TransaccionesClass();
//# sourceMappingURL=transacciones.class.js.map