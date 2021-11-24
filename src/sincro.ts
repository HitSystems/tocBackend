import { ticketsInstance } from './tickets/tickets.clase';
import { socket } from './sanPedro';
import { parametrosInstance } from './parametros/parametros.clase';
import { cajaInstance } from './caja/caja.clase';

function sincronizarTickets() {
    parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros != null) {
            ticketsInstance.getTicketMasAntiguo().then((res) => {
                if (res.length > 0) {
                    socket.emit('sincroTickets', {
                        parametros,
                        arrayTickets: res
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log('No hay parámetros definidos en la BBDD');
        }
    }).catch((err) => {
        console.log(err);
    });

}

function sincronizarCajas() {
    parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros != null) {
            cajaInstance.getCajaMasAntigua().then((res) => {
                if (res.length > 0) {
                    socket.emit('sincroCajas', {
                        parametros,
                        infoCaja: res[0]
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log('No hay parámetros definidos en la BBDD');
        }
    }).catch((err) => {
        console.log(err);
    });

}

setInterval(sincronizarTickets, 30000);
setInterval(sincronizarCajas, 40000);

export { sincronizarTickets, sincronizarCajas };