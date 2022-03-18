"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paytefInstance = void 0;
const axios_1 = require("axios");
const movimientos_clase_1 = require("../movimientos/movimientos.clase");
const parametros_clase_1 = require("../parametros/parametros.clase");
const trabajadores_clase_1 = require("../trabajadores/trabajadores.clase");
const tickets_clase_1 = require("../tickets/tickets.clase");
const cestas_clase_1 = require("../cestas/cestas.clase");
const tickets_interface_1 = require("../tickets/tickets.interface");
function limpiarNombreTienda(cadena) {
    const devolver = Number(cadena.replace(/\D/g, ''));
    if (isNaN(devolver) == false) {
        return devolver;
    }
    else {
        return 0;
    }
}
class PaytefClass {
    iniciarTransaccion(cantidad, idTicket, idCesta) {
        const params = parametros_clase_1.parametrosInstance.getParametros();
        if (params.ipTefpay != undefined && params.ipTefpay != null) {
            return axios_1.default.post(`http://${params.ipTefpay}:8887/transaction/start`, {
                pinpad: "*",
                opType: "sale",
                cardNumberHashDomain: "branch",
                createReceipt: true,
                executeOptions: {
                    method: "polling"
                },
                language: "es",
                requestedAmount: Math.round(cantidad * 100),
                requireConfirmation: false,
                transactionReference: `${idTicket}@${idCesta}`,
                showResultSeconds: 5
            }).then((res) => {
                if (res.data.info.started) {
                    return true;
                }
                else {
                    return false;
                }
            }).catch((err) => {
                console.log(err);
                return false;
            });
        }
        else {
            const devFalse = new Promise((dev, rej) => {
                dev(false);
            });
            return devFalse;
        }
    }
    async checkPagado(resPaytef, idClienteFinal) {
        if (resPaytef.result != undefined && resPaytef.result != null) {
            if (resPaytef.result.approved) {
                const infoTransaccion = resPaytef.result.transactionReference.split('@');
                let total = Number(resPaytef.result.amountWithSign.replace(",", "."));
                let idCesta = Number(infoTransaccion[1]);
                const infoTrabajador = await trabajadores_clase_1.trabajadoresInstance.getCurrentTrabajador();
                const nuevoIdTicket = (await tickets_clase_1.ticketsInstance.getUltimoTicket()) + 1;
                const cesta = await cestas_clase_1.cestas.getCesta(idCesta);
                if (cesta == null || cesta.lista.length == 0) {
                    return { error: true, mensaje: 'Error, la cesta es null o está vacía' };
                }
                idClienteFinal = (idClienteFinal != undefined) ? (idClienteFinal) : ('');
                const info = {
                    _id: nuevoIdTicket,
                    timestamp: Date.now(),
                    total: total,
                    lista: cesta.lista,
                    tipoPago: "TARJETA",
                    idTrabajador: infoTrabajador._id,
                    tiposIva: cesta.tiposIva,
                    cliente: idClienteFinal,
                    infoClienteVip: {
                        esVip: false,
                        nif: '',
                        nombre: '',
                        cp: '',
                        direccion: '',
                        ciudad: ''
                    },
                    enviado: false,
                    enTransito: false,
                    intentos: 0,
                    comentario: '',
                    regalo: (cesta.regalo == true && idClienteFinal != '' && idClienteFinal != null) ? (true) : (false)
                };
                if (await tickets_clase_1.ticketsInstance.insertarTicket(info)) {
                    if (await cestas_clase_1.cestas.borrarCesta(idCesta)) {
                        movimientos_clase_1.movimientosInstance.nuevaSalida(total, 'Targeta', 'TARJETA', false, nuevoIdTicket);
                        if (await parametros_clase_1.parametrosInstance.setUltimoTicket(info._id)) {
                            return { error: false };
                        }
                        else {
                            return { error: true, mensaje: 'Error no se ha podido cambiar el último id ticket' };
                        }
                    }
                    else {
                        return { error: true, mensaje: 'Error, no se ha podido borrar la cesta' };
                    }
                }
            }
            else {
                return { error: true, mensaje: "Operación denegada o cancelada" };
            }
        }
        else {
            return { error: true, mensaje: 'Backend: Error, no hay resultado de paytef' };
        }
    }
}
const paytefInstance = new PaytefClass();
exports.paytefInstance = paytefInstance;
//# sourceMappingURL=paytef.class.js.map