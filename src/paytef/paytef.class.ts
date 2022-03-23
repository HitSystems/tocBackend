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

function limpiarNombreTienda(cadena: string) {
  const devolver = Number(cadena.replace(/\D/g, ''));
  if (isNaN(devolver) == false) {
    return devolver;
  } else {
    return 0;
  }
}

class PaytefClass {
  iniciarTransaccion(idCliente: string) {
    return trabajadoresInstance.getCurrentIdTrabajador().then((idTrabajadorActivo) => {
      if (idTrabajadorActivo != null) {
        cestas.getCestaByTrabajadorID(idTrabajadorActivo).then((cesta) => {
          if (cesta != null) {
            const total = cesta.tiposIva.importe1 + cesta.tiposIva.importe2 + cesta.tiposIva.importe3;
            // La lista no puede estar vacía ni el total puede ser cero.
            if (cesta.lista.length > 0 && total > 0) {
              return transaccionesInstance.crearTransaccion(cesta, total, idCliente).then((resTransaccion) => {
                if (!resTransaccion.error) {
                  const params = parametrosInstance.getParametros();
                  if (params.ipTefpay != undefined && params.ipTefpay != null) {
                    return axios.post(`http://${params.ipTefpay}:8887/transaction/start`, {
                      pinpad: "*",
                      opType: "sale",
                      cardNumberHashDomain: "branch",
                      createReceipt: true,
                      executeOptions: {
                        method: "polling"
                      },
                      language: "es",
                      requestedAmount: Math.round(total*100),
                      requireConfirmation: false,
                      transactionReference: resTransaccion.insertedId,
                      showResultSeconds: 5
                    }).then((res: any) => {
                      if (res.data.info.started) {
                        return true;
                      }
                      return false;                      
                    }).catch((err) => {
                      console.log(err);
                      return false
                    });
                  } else {
                    return false;
                  }
                } else {
                  console.log(resTransaccion.mensaje);
                  return false;
                }
              }).catch((err) => {
                console.log(err);
                return false;
              });
            } else {

            }
          } else {
            return false;
          }
        });
      } else {
        return false;
      }
    });    
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
