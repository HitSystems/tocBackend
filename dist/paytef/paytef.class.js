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
const cestas_interface_1 = require("../cestas/cestas.interface");
const transacciones_class_1 = require("../transacciones/transacciones.class");
const tickets_mongodb_1 = require("../tickets/tickets.mongodb");
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
    iniciarTransaccion(idCliente) {
        return trabajadores_clase_1.trabajadoresInstance.getCurrentIdTrabajador().then((idTrabajadorActivo) => {
            if (idTrabajadorActivo != null) {
                cestas_clase_1.cestas.getCestaByTrabajadorID(idTrabajadorActivo).then((cesta) => {
                    if (cesta != null) {
                        const total = cesta.tiposIva.importe1 + cesta.tiposIva.importe2 + cesta.tiposIva.importe3;
                        if (cesta.lista.length > 0 && total > 0) {
                            return transacciones_class_1.transaccionesInstance.crearTransaccion(cesta, total, idCliente).then((resTransaccion) => {
                                if (!resTransaccion.error) {
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
                                            requestedAmount: Math.round(total * 100),
                                            requireConfirmation: false,
                                            transactionReference: resTransaccion.insertedId,
                                            showResultSeconds: 5
                                        }).then((res) => {
                                            if (res.data.info.started) {
                                                return true;
                                            }
                                            return false;
                                        }).catch((err) => {
                                            console.log(err);
                                            return false;
                                        });
                                    }
                                    else {
                                        return false;
                                    }
                                }
                                else {
                                    console.log(resTransaccion.mensaje);
                                    return false;
                                }
                            }).catch((err) => {
                                console.log(err);
                                return false;
                            });
                        }
                        else {
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                return false;
            }
        });
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