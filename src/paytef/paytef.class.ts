import axios from "axios";
import { socketInterno } from "../sockets.gateway";
import { movimientosInstance } from "../movimientos/movimientos.clase";
import { parametrosInstance } from "src/parametros/parametros.clase";
import { trabajadoresInstance } from "src/trabajadores/trabajadores.clase";
import { ticketsInstance } from "src/tickets/tickets.clase";
import { cestas } from "src/cestas/cestas.clase";
import { TicketsInterface } from "src/tickets/tickets.interface";
import { CestasInterface } from "src/cestas/cestas.interface";
import { transaccionesInstance } from "src/transacciones/transacciones.class";
import { nuevoTicket } from "src/tickets/tickets.mongodb";
import { UtilesModule } from "src/utiles/utiles.module";
import { LogsClass } from "src/logs/logs.class";
import { TransaccionesInterface } from "src/transacciones/transacciones.interface";

function limpiarNombreTienda(cadena: string) {
  const devolver = Number(cadena.replace(/\D/g, ''));
  if (isNaN(devolver) == false) {
    return devolver;
  } else {
    return 0;
  }
}

class PaytefClass {
  async iniciarTransaccion(idCliente: string): Promise<boolean> {
    try {
      /* Obtengo el trabajador actual */
      const idTrabajadorActivo = await trabajadoresInstance.getCurrentIdTrabajador();
      /* ¿Trabajador activo existe? */
      if (idTrabajadorActivo != null) {
        /* Obtengo la cesta del trabajador activo */
        const cesta = await cestas.getCestaByTrabajadorID(idTrabajadorActivo);
        /* ¿Existe la cesta del trabajador activo? */
        if (cesta != null) {
          /* Consigo el total de la cesta para enviarlo a PayTef */
          const total = cesta.tiposIva.importe1 + cesta.tiposIva.importe2 + cesta.tiposIva.importe3;
          // La lista no puede estar vacía ni el total puede ser cero.
          if (cesta.lista.length > 0 && total > 0) {
            /* Creo la transacción con los datos de la cesta, total e idCliente => MongoDB */
            const resTransaccion = await transaccionesInstance.crearTransaccion(cesta, total, idCliente);
            /* ¿La transacción se ha generado correctamente en MongoDB? */
            if (resTransaccion.error === false) {
              /* ¿insertedId es válido? */
              if (UtilesModule.checkVariable(resTransaccion.insertedId) && resTransaccion.insertedId !== '') {
                const params = parametrosInstance.getParametros();
                /* ¿La IP de PayTef está bien definida? */
                if (UtilesModule.checkVariable(params.ipTefpay)) {
                  /* COMIENZA LA TRANSACCIÓN */
                  const respuestaPaytef: any = await axios.post(`http://${params.ipTefpay}:8887/transaction/start`, {
                    pinpad: "*",
                    opType: "sale",
                    createReceipt: true,
                    executeOptions: {
                      method: "polling"
                    },
                    language: "es",
                    requestedAmount: Math.round(total*100),
                    requireConfirmation: false,
                    transactionReference: resTransaccion.insertedId,
                    showResultSeconds: 5
                  });
                  /* ¿Ha iniciado la operación en el datáfono? */
                  if (respuestaPaytef.data.info.started) {
                    this.consultarEstadoOperacion();
                    return true;
                  }
                  return false;
                } else {
                  return false;
                }
              }
            } else {
              console.log(resTransaccion.mensaje);
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch(err) {
      console.log(err.message);
      LogsClass.newLog('iniciarTransaccion PayTefClass', err.message)
      return false;
    }
  }

  async consultarEstadoOperacion(): Promise<void> {
    try {
      /* OBTENGO IP PAYTEF & ÚLTIMA TRANSACCIÓN DE MONGODB */
      const ipDatafono = parametrosInstance.getParametros().ipTefpay;
      const ultimaTransaccion: TransaccionesInterface = await transaccionesInstance.getUltimaTransaccion();

      /* Inicio consulta de estado de la operación */
      const res: any = await axios.post(`http://${ipDatafono}:8887/transaction/poll`, { pinpad: "*" });

      /* ¿Ya existe el resultado de PayTef? */
      if (UtilesModule.checkVariable(res.data.result)) {
        /* ¿La transacción de PayTef es exactamente la misma que la última obtenida desde MongoDB? */
        if (res.data.result.transactionReference === ultimaTransaccion._id.toString()) {
          /* ¿Venta aprobada sin fallos? */
          if (res.data.result.approved && !res.data.result.failed) {
            /* Cierro ticket */
            const resCierreTicket = await paytefInstance.cerrarTicket(res.data.result.transactionReference);
            if (resCierreTicket.error === true) {
              socketInterno.server.emit('consultaPaytef', { error: true, mensaje: resCierreTicket.mensaje });
            } else {
              /* Operación aprobada y finalizada */
              socketInterno.server.emit('consultaPaytef', { error: false, operacionCorrecta: true });
            }
          } else {
            /* La operación ha sido denegada */
            socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'Operación denegada' });
          }
        } else {
          await axios.post(`http://${ipDatafono}:8887/pinpad/cancel`, { "pinpad": "*" });
          socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'La transacción no coincide con la actual de MongoDB' });
        }
        /* ¿Existe info de PayTef? NO es igual a RESULT */
      } else if (UtilesModule.checkVariable(res.data.info)) {
        if (res.data.info.transactionStatus === 'cancelling') {
          socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'Operación cancelada' });
        } else {
          /* Vuelvo a empezar el ciclo */
          await new Promise(r => setTimeout(r, 1000));
          this.consultarEstadoOperacion();
        }
      } else {
        socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'Error incontrolado PAYTEF' });
      }
    } catch(err) {
      console.log(err);
      LogsClass.newLog('Error backend paytefClass consultarEstadoOperacion', err.message);
      socketInterno.server.emit('consultaPaytef', { error: true, mensaje: 'Error ' + err.message });
    }
  }
  
  // iniciarTransaccion(cantidad: number, idTicket: number, idCesta: number) {
  //   const params = parametrosInstance.getParametros();
  //   if (params.ipTefpay != undefined && params.ipTefpay != null) {
  //     return axios.post(`http://${params.ipTefpay}:8887/transaction/start`, {
  //       pinpad: "*",
  //       opType: "sale",
  //       cardNumberHashDomain: "branch",
  //       createReceipt: true,
  //       executeOptions: {
  //         method: "polling"
  //       },
  //       language: "es",
  //       requestedAmount: Math.round(cantidad*100),
  //       requireConfirmation: false,
  //       transactionReference: `${idTicket}@${idCesta}`,
  //       showResultSeconds: 5
  //     }).then((res: any) => {
  //       if (res.data.info.started) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //       return false
  //     });
  //   } else {
  //     const devFalse: Promise<boolean> = new Promise((dev, rej) => {
  //       dev(false);
  //     });
  //     return devFalse;
  //   }
  // }

  async cerrarTicket(idTransaccion: string) {
    return transaccionesInstance.getTransaccionById(idTransaccion).then(async (infoTransaccion) => {
      if (infoTransaccion != null) {
        try {
          await transaccionesInstance.setPagada(idTransaccion);
        } catch(err) {
          console.log(err);
          return { error: true, mensaje: 'Error, no se ha podido marcar como pagada la transacción ' + idTransaccion };
        }
        
        const parametros = parametrosInstance.getParametros();
        /* Creo datos del ticket */
        const nuevoTicket: TicketsInterface = {
          _id: (await ticketsInstance.getUltimoTicket())+1,
          timestamp: Date.now(),
          total: infoTransaccion.total,
          lista: infoTransaccion.cesta.lista,
          tipoPago: "TARJETA",
          idTrabajador: parametros.idCurrentTrabajador,
          tiposIva: infoTransaccion.cesta.tiposIva,
          cliente: infoTransaccion.idCliente,
          infoClienteVip: {
              esVip : false,
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
          regalo: (infoTransaccion.cesta.regalo == true && infoTransaccion.idCliente != '' && infoTransaccion.idCliente != null) ? (true): (false)
        }
        if (await ticketsInstance.insertarTicket(nuevoTicket)) {
          if (await cestas.borrarCestaActiva()) {
            movimientosInstance.nuevaSalida(infoTransaccion.total, 'Targeta', 'TARJETA', false, nuevoTicket._id);
            if (await parametrosInstance.setUltimoTicket(nuevoTicket._id)) {
              return { error: false };
            } else {
              return { error: true, mensaje: 'Error no se ha podido cambiar el último id ticket' };
            }
          } else {
            return { error: true, mensaje: 'Error, no se ha podido borrar la cesta' };
          }
        }
      } else {
        return { error: true, mensaje: 'Error,  no se ha podido recuperar la transacción' };
      }
    });      
  }
}

const paytefInstance = new PaytefClass();
export { paytefInstance };
