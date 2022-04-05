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
exports.devolucionesInstance = exports.Devoluciones = void 0;
const impresora_class_1 = require("../impresora/impresora.class");
const cestas_clase_1 = require("../cestas/cestas.clase");
const trabajadores_clase_1 = require("../trabajadores/trabajadores.clase");
const schDevoluciones = __importStar(require("./devoluciones.mongodb"));
class Devoluciones {
    constructor() {
        this.bloqueado = false;
    }
    async nuevaDevolucion(total, idCesta) {
        if (this.bloqueado == false) {
            this.bloqueado = true;
            const infoTrabajador = await trabajadores_clase_1.trabajadoresInstance.getCurrentTrabajador();
            const nuevoIdTicket = Date.now();
            const cesta = await cestas_clase_1.cestas.getCesta(idCesta);
            if (cesta == null || cesta.lista.length == 0) {
                console.log("Error, la cesta es null o está vacía");
                this.bloqueado = false;
                return false;
            }
            const objDevolucion = {
                _id: nuevoIdTicket,
                timestamp: Date.now(),
                total: total,
                lista: cesta.lista,
                tipoPago: "DEVOLUCION",
                idTrabajador: infoTrabajador._id,
                tiposIva: cesta.tiposIva,
                enviado: false,
                enTransito: false,
                intentos: 0,
                comentario: '',
            };
            if (await this.insertarDevolucion(objDevolucion)) {
                impresora_class_1.impresoraInstance.imprimirTicket(nuevoIdTicket, true);
                this.bloqueado = false;
                return await cestas_clase_1.cestas.borrarCesta(idCesta);
            }
            else {
                this.bloqueado = false;
                return false;
            }
        }
        else {
            return false;
        }
    }
    getDevolucionMasAntigua() {
        return schDevoluciones.getDevolucionMasAntigua();
    }
    actualizarEstadoDevolucion(devolucion) {
        return schDevoluciones.actualizarEstadoDevolucion(devolucion).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    insertarDevolucion(data) {
        return schDevoluciones.insertarDevolucion(data).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    getDevolucionByID(id) {
        return schDevoluciones.getDevolucionByID(id);
    }
}
exports.Devoluciones = Devoluciones;
exports.devolucionesInstance = new Devoluciones();
//# sourceMappingURL=devoluciones.clase.js.map