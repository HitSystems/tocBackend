"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sincronizarDevoluciones = exports.sincronizarFichajes = exports.sincronizarMovimientos = exports.sincronizarCajas = exports.sincronizarTickets = void 0;
const tickets_clase_1 = require("./tickets/tickets.clase");
const sanPedro_1 = require("./sanPedro");
const parametros_clase_1 = require("./parametros/parametros.clase");
const caja_clase_1 = require("./caja/caja.clase");
const movimientos_clase_1 = require("./movimientos/movimientos.clase");
const trabajadores_clase_1 = require("./trabajadores/trabajadores.clase");
const devoluciones_clase_1 = require("./devoluciones/devoluciones.clase");
function sincronizarTickets() {
    parametros_clase_1.parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros != null) {
            tickets_clase_1.ticketsInstance.getTicketMasAntiguo().then((res) => {
                if (res.length > 0) {
                    sanPedro_1.socket.emit('sincroTickets', {
                        parametros,
                        arrayTickets: res
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            console.log('No hay parámetros definidos en la BBDD');
        }
    }).catch((err) => {
        console.log(err);
    });
}
exports.sincronizarTickets = sincronizarTickets;
function sincronizarCajas() {
    parametros_clase_1.parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros != null) {
            caja_clase_1.cajaInstance.getCajaMasAntigua().then((res) => {
                if (res.length > 0) {
                    sanPedro_1.socket.emit('sincroCajas', {
                        parametros,
                        infoCaja: res[0]
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            console.log('No hay parámetros definidos en la BBDD');
        }
    }).catch((err) => {
        console.log(err);
    });
}
exports.sincronizarCajas = sincronizarCajas;
function sincronizarMovimientos() {
    parametros_clase_1.parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros != null) {
            movimientos_clase_1.movimientosInstance.getMovimientoMasAntiguo().then((res) => {
                if (res != null) {
                    sanPedro_1.socket.emit('sincroMovimientos', {
                        parametros,
                        movimiento: res
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            console.log('No hay parámetros definidos en la BBDD');
        }
    }).catch((err) => {
        console.log(err);
    });
}
exports.sincronizarMovimientos = sincronizarMovimientos;
function sincronizarFichajes() {
    parametros_clase_1.parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros != null) {
            trabajadores_clase_1.trabajadoresInstance.getFichajeMasAntiguo().then((res) => {
                if (res != null) {
                    sanPedro_1.socket.emit('sincroFichajes', {
                        parametros,
                        fichaje: res
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            console.log('No hay parámetros definidos en la BBDD');
        }
    }).catch((err) => {
        console.log(err);
    });
}
exports.sincronizarFichajes = sincronizarFichajes;
function sincronizarDevoluciones() {
    console.log('lol 1');
    parametros_clase_1.parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros !== null) {
            console.log('lol 2');
            devoluciones_clase_1.devolucionesInstance.getDevolucionMasAntigua().then((res) => {
                console.log('lol 3');
                if (res !== null) {
                    console.log(res);
                    sanPedro_1.socket.emit('sincroDevoluciones', {
                        parametros,
                        devolucion: res,
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            console.log('No hay parámetros definidos en la BBDD');
        }
    }).catch((err) => {
        console.log(err);
    });
}
exports.sincronizarDevoluciones = sincronizarDevoluciones;
setInterval(sincronizarTickets, 30000);
setInterval(sincronizarCajas, 40000);
setInterval(sincronizarMovimientos, 50000);
setInterval(sincronizarFichajes, 20000);
setInterval(sincronizarDevoluciones, 5000);
//# sourceMappingURL=sincro.js.map