import { ticketsInstance } from './tickets/tickets.clase';
import { socket } from './sanPedro';
import { parametrosInstance } from './parametros/parametros.clase';
import { cajaInstance } from './caja/caja.clase';
import { movimientosInstance } from './movimientos/movimientos.clase';
import { trabajadoresInstance } from './trabajadores/trabajadores.clase';
import { devolucionesInstance } from './devoluciones/devoluciones.clase';

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

function sincronizarMovimientos() {
    parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros != null) {
            movimientosInstance.getMovimientoMasAntiguo().then((res) => {
                if (res != null) {
                    socket.emit('sincroMovimientos', {
                        parametros,
                        movimiento: res
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

function sincronizarFichajes() {
    parametrosInstance.getEspecialParametros().then((parametros) => {
        if (parametros != null) {
            trabajadoresInstance.getFichajeMasAntiguo().then((res) => {
                if (res != null) {
                    socket.emit('sincroFichajes', {
                        parametros,
                        fichaje: res
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

function sincronizarDevoluciones() {
    parametrosInstance.getEspecialParametros().then((parametros) => {
        if(parametros !== null) {
            devolucionesInstance.getDevolucionMasAntigua().then((res) => {
                if(res !== null) {
                    console.log(res);
                    socket.emit('sincroDevoluciones', {
                        parametros,
                        devolucion: res,
                    })
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            console.log('No hay parámetros definidos en la BBDD');
        }
    }).catch((err) => {
        console.log(err);
    })
}

setInterval(sincronizarTickets, 30000);
setInterval(sincronizarCajas, 40000);
setInterval(sincronizarMovimientos, 50000);
setInterval(sincronizarFichajes, 20000);
// setInterval(sincronizarDevoluciones, 5000);

export { sincronizarTickets, sincronizarCajas, sincronizarMovimientos, sincronizarFichajes, sincronizarDevoluciones };