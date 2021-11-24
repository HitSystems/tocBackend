"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sincronizarCajas = exports.sincronizarTickets = void 0;
const tickets_clase_1 = require("./tickets/tickets.clase");
const sanPedro_1 = require("./sanPedro");
const parametros_clase_1 = require("./parametros/parametros.clase");
const caja_clase_1 = require("./caja/caja.clase");
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
setInterval(sincronizarTickets, 30000);
setInterval(sincronizarCajas, 40000);
//# sourceMappingURL=sincro.js.map