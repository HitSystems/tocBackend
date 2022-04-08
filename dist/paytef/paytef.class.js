"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paytefInstance = void 0;
const axios_1 = require("axios");
const sockets_gateway_1 = require("../sockets.gateway");
const movimientos_clase_1 = require("../movimientos/movimientos.clase");
const parametros_clase_1 = require("../parametros/parametros.clase");
const trabajadores_clase_1 = require("../trabajadores/trabajadores.clase");
const tickets_clase_1 = require("../tickets/tickets.clase");
const cestas_clase_1 = require("../cestas/cestas.clase");
const tickets_interface_1 = require("../tickets/tickets.interface");
const cestas_interface_1 = require("../cestas/cestas.interface");
const transacciones_class_1 = require("../transacciones/transacciones.class");
const tickets_mongodb_1 = require("../tickets/tickets.mongodb");
const utiles_module_1 = require("../utiles/utiles.module");
const logs_class_1 = require("../logs/logs.class");
const transacciones_interface_1 = require("../transacciones/transacciones.interface");
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
    async iniciarTransaccion(idCliente) {
        try {
            const idTrabajadorActivo = await trabajadores_clase_1.trabajadoresInstance.getCurrentIdTrabajador();
            if (idTrabajadorActivo != null) {
                const cesta = await cestas_clase_1.cestas.getCestaByTrabajadorID(idTrabajadorActivo);
                if (cesta != null) {
                    const total = cesta.tiposIva.importe1 + cesta.tiposIva.importe2 + cesta.tiposIva.importe3;
                    if (cesta.lista.length > 0 && total > 0) {
                        const resTransaccion = await transacciones_class_1.transaccionesInstance.crearTransaccion(cesta, total, idCliente);
                        if (resTransaccion.error === false) {
                            if (utiles_module_1.UtilesModule.checkVariable(resTransaccion.insertedId) && resTransaccion.insertedId !== '') {
                                const params = parametros_clase_1.parametrosInstance.getParametros();
                                if (utiles_module_1.UtilesModule.checkVariable(params.ipTefpay)) {
                                    const respuestaPaytef = await axios_1.default.post(`http://${params.ipTefpay}:8887/transaction/start`, {
                                        pinpad: "*",
                                        opType: "sale",
                                        createReceipt: true,
                                        executeOptions: {
                                            method: "polling"
                                        },
                                        language: "es",
                                        requestedAmount: Math.round(total * 100),
                                        requireConfirmation: false,
                                        transactionReference: resTransaccion.insertedId,
                                        showResultSeconds: 5
                                    });
                                    if (respuestaPaytef.data.info.started) {
                                        this.consultarEstadoOperacion();
                                        return true;
                                    }
                                    return false;
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        else {
                            console.log(resTransaccion.mensaje);
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err.message);
            logs_class_1.LogsClass.newLog('iniciarTransaccion PayTefClass', err.message);
            return false;
        }
    }
    async consultarEstadoOperacion() {
        try {
            const ipDatafono = parametros_clase_1.parametrosInstance.getParametros().ipTefpay;
            const ultimaTransaccion = await transacciones_class_1.transaccionesInstance.getUltimaTransaccion();
            const res = await axios_1.default.post(`http://${ipDatafono}:8887/transaction/poll`, { pinpad: "*" });
            if (utiles_module_1.UtilesModule.checkVariable(res.data.result)) {
                if (res.data.result.transactionReference === ultimaTransaccion._id.toString()) {
                    if (res.data.result.approved && !res.data.result.failed) {
                        const resCierreTicket = await paytefInstance.cerrarTicket(res.data.result.transactionReference);
                        if (resCierreTicket.error === true) {
                            sockets_gateway_1.socketInterno.server.emit('consultaPaytef', { error: true, mensaje: resCierreTicket.mensaje });
                        }
                        else {
                            sockets_gateway_1.socketInterno.server.emit('consultaPaytef', { error: false, operacionCorrecta: true });
                        }
                    }
                    else {
                        sockets_gateway_1.socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'Operación denegada' });
                    }
                }
                else {
                    await axios_1.default.post(`http://${ipDatafono}:8887/pinpad/cancel`, { "pinpad": "*" });
                    sockets_gateway_1.socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'La transacción no coincide con la actual de MongoDB' });
                }
            }
            else if (utiles_module_1.UtilesModule.checkVariable(res.data.info)) {
                if (res.data.info.transactionStatus === 'cancelling') {
                    sockets_gateway_1.socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'Operación cancelada' });
                }
                else {
                    await new Promise(r => setTimeout(r, 1000));
                    this.consultarEstadoOperacion();
                }
            }
            else {
                sockets_gateway_1.socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'Error incontrolado PAYTEF' });
            }
        }
        catch (err) {
            console.log(err);
            logs_class_1.LogsClass.newLog('Error backend paytefClass consultarEstadoOperacion', err.message);
            sockets_gateway_1.socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'Error ' + err.message });
        }
    }
    async cerrarTicket(idTransaccion) {
        return transacciones_class_1.transaccionesInstance.getTransaccionById(idTransaccion).then(async (infoTransaccion) => {
            if (infoTransaccion != null) {
                try {
                    await transacciones_class_1.transaccionesInstance.setPagada(idTransaccion);
                }
                catch (err) {
                    console.log(err);
                    return { error: true, mensaje: 'Error, no se ha podido marcar como pagada la transacción ' + idTransaccion };
                }
                const parametros = parametros_clase_1.parametrosInstance.getParametros();
                const nuevoTicket = {
                    _id: (await tickets_clase_1.ticketsInstance.getUltimoTicket()) + 1,
                    timestamp: Date.now(),
                    total: infoTransaccion.total,
                    lista: infoTransaccion.cesta.lista,
                    tipoPago: "TARJETA",
                    idTrabajador: parametros.idCurrentTrabajador,
                    tiposIva: infoTransaccion.cesta.tiposIva,
                    cliente: infoTransaccion.idCliente,
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
                    regalo: (infoTransaccion.cesta.regalo == true && infoTransaccion.idCliente != '' && infoTransaccion.idCliente != null) ? (true) : (false)
                };
                if (await tickets_clase_1.ticketsInstance.insertarTicket(nuevoTicket)) {
                    if (await cestas_clase_1.cestas.borrarCestaActiva()) {
                        movimientos_clase_1.movimientosInstance.nuevaSalida(infoTransaccion.total, 'Targeta', 'TARJETA', false, nuevoTicket._id);
                        if (await parametros_clase_1.parametrosInstance.setUltimoTicket(nuevoTicket._id)) {
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
                return { error: true, mensaje: 'Error,  no se ha podido recuperar la transacción' };
            }
        });
    }
}
const paytefInstance = new PaytefClass();
exports.paytefInstance = paytefInstance;
//# sourceMappingURL=paytef.class.js.map