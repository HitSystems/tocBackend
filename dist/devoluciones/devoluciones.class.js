"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devolucionesInstance = exports.Devoluciones = void 0;
const cestas_clase_1 = require("../cestas/cestas.clase");
const trabajadores_clase_1 = require("../trabajadores/trabajadores.clase");
const schDevoluciones = require("./devoluciones.mongodb");
class Devoluciones {
    async nuevaDevolucion(total, idCesta) {
        const infoTrabajador = await trabajadores_clase_1.trabajadoresInstance.getCurrentTrabajador();
        const nuevoIdTicket = Date.now();
        const cesta = await cestas_clase_1.cestas.getCesta(idCesta);
        if (cesta == null || cesta.lista.length == 0) {
            console.log("Error, la cesta es null o está vacía");
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
            enTransito: false
        };
        if (this.insertarDevolucion(objDevolucion)) {
            return await cestas_clase_1.cestas.borrarCesta(idCesta);
        }
        else {
            return false;
        }
    }
    insertarDevolucion(data) {
        return schDevoluciones.insertarDevolucion(data).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
exports.Devoluciones = Devoluciones;
exports.devolucionesInstance = new Devoluciones();
//# sourceMappingURL=devoluciones.class.js.map