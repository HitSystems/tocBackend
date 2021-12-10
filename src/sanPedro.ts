import { ticketsInstance } from "./tickets/tickets.clase";
import { sincronizarTickets, sincronizarCajas, sincronizarMovimientos, sincronizarFichajes } from "./sincro";
import { cajaInstance } from "./caja/caja.clase";
import { movimientosInstance } from "./movimientos/movimientos.clase";
import { trabajadoresInstance } from "./trabajadores/trabajadores.clase";

const io = require("socket.io-client");
const socket = io('http://54.74.52.150:3001'); // NORMAL
// const socket = io('http://localhost:3001'); // DEV SANPEDRO EN LOCAL

socket.on('resSincroTickets', async (data) => {
    if (data.error == false) {
        if (data.arrayTickets.length > 0) {
            if (await ticketsInstance.actualizarEstadoTicket(data.arrayTickets[0])) {
                console.log("Ticket enviado y guardado OK");
                sincronizarTickets();
            } else {
                console.log("Error al actualizar el ticket");
            }
        } else {
            console.log('Nada que insertar');
        }
    } else {
        if (typeof data.arrayTickets[0].comentario == 'string') {
            if (data.mensaje == 'SanPedro: Error, parámetros incorrectos') {
                data.arrayTickets[0].comentario = 'SanPedro: Error, parámetros incorrectos';
            }

            ticketsInstance.actualizarComentario(data.arrayTickets[0]);
        } 
        console.log(data.mensaje);
    }
});

socket.on('resCajas', (data) => {
    if (data.error == false) {
        if (data.repetir == false) {
            cajaInstance.confirmarCajaEnviada(data.infoCaja).then((res) => {
                if (res) {
                    sincronizarCajas();
                } else {
                    console.log("Error al actualizar el estado de la caja");
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            cajaInstance.confirmarCajaHabiaLlegado(data.infoCaja).then((res) => {
                if (res) {
                    sincronizarCajas();
                } else {
                    console.log("Error al actualizar el estado de la caja 2");
                }
            }).catch((err) => {
                console.log(err);
            });
            // cambiar estado infoCaja en mongo (enviado + comentario)
        }
    } else {
        console.log(data.mensaje);
    }
});

socket.on('resMovimientos', (data) => {
    if (data.error == false) {
        movimientosInstance.actualizarEstadoMovimiento(data.movimiento).then((res) => {
            if (res) {
                sincronizarMovimientos();
            } else {
                console.log("Error al actualizar el estado del movimiento");
            }
        }).catch((err) => {
            console.log(err);
        });
    } else {
        console.log(data.mensaje);
    }
});

socket.on('resFichajes', (data) => {
    if (data.error == false) {
        trabajadoresInstance.actualizarEstadoFichaje(data.fichaje).then((res) => {
            if (res) {
                sincronizarFichajes();
            } else {
                console.log("Error al actualizar el estado del fichaje");
            }
        }).catch((err) => {
            console.log(err);
        });
    } else {
        console.log(data.mensaje);
    }
});

export { socket };