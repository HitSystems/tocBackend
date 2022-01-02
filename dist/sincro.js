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
const teclado_clase_1 = require("./teclado/teclado.clase");
function sincronizarTickets() {
    parametros_clase_1.parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros != null) {
            tickets_clase_1.ticketsInstance.getTicketMasAntiguo().then((res) => {
                if (res.length > 0) {
                    console.log(sanPedro_1.socket.sendBuffer);
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
    parametros_clase_1.parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros !== null) {
            devoluciones_clase_1.devolucionesInstance.getDevolucionMasAntigua().then((res) => {
                if (res !== null) {
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
function actualizarTeclados() {
    teclado_clase_1.tecladoInstance.actualizarTeclado().catch((err) => {
        console.log(err);
    });
}
setInterval(sincronizarTickets, 30000);
setInterval(sincronizarCajas, 40000);
setInterval(sincronizarMovimientos, 50000);
setInterval(sincronizarFichajes, 20000);
setInterval(sincronizarDevoluciones, 60000);
setInterval(actualizarTeclados, 3600000);
//# sourceMappingURL=sincro.js.map