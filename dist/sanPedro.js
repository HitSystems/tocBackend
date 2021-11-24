"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const tickets_clase_1 = require("./tickets/tickets.clase");
const sincro_1 = require("./sincro");
const caja_clase_1 = require("./caja/caja.clase");
const io = require("socket.io-client");
const socket = io('http://54.74.52.150:3001');
exports.socket = socket;
socket.on('resSincroTickets', async (data) => {
    if (data.error == false) {
        if (data.arrayTickets.length > 0) {
            if (await tickets_clase_1.ticketsInstance.actualizarEstadoTicket(data.arrayTickets[0])) {
                console.log("Ticket enviado y guardado OK");
                (0, sincro_1.sincronizarTickets)();
            }
            else {
                console.log("Error al actualizar el ticket");
            }
        }
        else {
            console.log('Nada que insertar');
        }
    }
    else {
        if (typeof data.arrayTickets[0].comentario == 'string') {
            if (data.mensaje == 'SanPedro: Error, parámetros incorrectos') {
                data.arrayTickets[0].comentario = 'SanPedro: Error, parámetros incorrectos';
            }
            tickets_clase_1.ticketsInstance.actualizarComentario(data.arrayTickets[0]);
        }
        console.log(data.mensaje);
    }
});
socket.on('resCajas', (data) => {
    if (data.error == false) {
        if (data.repetir == false) {
            caja_clase_1.cajaInstance.confirmarCajaEnviada(data.infoCaja).then((res) => {
                if (res) {
                    (0, sincro_1.sincronizarCajas)();
                }
                else {
                    console.log("Error al actualizar el estado de la caja");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            caja_clase_1.cajaInstance.confirmarCajaHabiaLlegado(data.infoCaja).then((res) => {
                if (res) {
                    (0, sincro_1.sincronizarCajas)();
                }
                else {
                    console.log("Error al actualizar el estado de la caja 2");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    else {
        console.log(data.mensaje);
    }
});
//# sourceMappingURL=sanPedro.js.map