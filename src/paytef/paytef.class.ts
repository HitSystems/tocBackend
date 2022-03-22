import axios from "axios";
import { socketInterno } from "../sockets.gateway";
import { movimientosInstance } from "../movimientos/movimientos.clase";
import { parametrosInstance } from "src/parametros/parametros.clase";
import { trabajadoresInstance } from "src/trabajadores/trabajadores.clase";
import { ticketsInstance } from "src/tickets/tickets.clase";
import { cestas } from "src/cestas/cestas.clase";
import { TicketsInterface } from "src/tickets/tickets.interface";

function limpiarNombreTienda(cadena: string) {
  const devolver = Number(cadena.replace(/\D/g, ''));
  if (isNaN(devolver) == false) {
    return devolver;
  } else {
    return 0;
  }
}

class PaytefClass {
  iniciarTransaccion(cantidad: number, idTicket: number, idCesta: number) {
    /*
      0. Obtener la cesta desde el idCesta del parámetro.
      1. Crear uuid.
      2. Crear transacción con todo lo necesario para crear un ticket.
    */
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
        requestedAmount: Math.round(cantidad*100),
        requireConfirmation: false,
        transactionReference: `${idTicket}@${idCesta}`,
        showResultSeconds: 5
      }).then((res: any) => {
        if (res.data.info.started) {
          return true;
        } else {
          return false;
        }
      }).catch((err) => {
        console.log(err);
        return false
      });
    } else {
      const devFalse: Promise<boolean> = new Promise((dev, rej) => {
        dev(false);
      });
      return devFalse;
    }
  }

  async checkPagado(resPaytef, idClienteFinal: string) {
    if (resPaytef.result != undefined && resPaytef.result != null) {
      if (resPaytef.result.approved) {
        const infoTransaccion = resPaytef.result.transactionReference.split('@');
        let total: number = Number(resPaytef.result.amountWithSign.replace(",", "."));

        let idCesta: number = Number(infoTransaccion[1]);
        const infoTrabajador = await trabajadoresInstance.getCurrentTrabajador();
        const nuevoIdTicket = (await ticketsInstance.getUltimoTicket()) + 1;
        const cesta = await cestas.getCestaByTrabajadorID(infoTrabajador.idTrabajador);

        /* Comprobación cesta correcta */
        if (cesta == null || cesta.lista.length == 0) {

          return { error: true, mensaje: 'Error, la cesta es null o está vacía' };
        }
  
        idClienteFinal = (idClienteFinal != undefined) ? (idClienteFinal) : ('');
        /* Creo datos del ticket */
        const info: TicketsInterface = {
            _id: nuevoIdTicket,
            timestamp: Date.now(),
            total: total,
            lista: cesta.lista,
            tipoPago: "TARJETA",
            idTrabajador: infoTrabajador._id,
            tiposIva: cesta.tiposIva,
            cliente: idClienteFinal,
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
            regalo: (cesta.regalo == true && idClienteFinal != '' && idClienteFinal != null) ? (true): (false)
        }

        if (await ticketsInstance.insertarTicket(info)) {
            if (await cestas.borrarCesta(idCesta)) {
              movimientosInstance.nuevaSalida(total, 'Targeta', 'TARJETA', false, nuevoIdTicket);
              if (await parametrosInstance.setUltimoTicket(info._id)) {
                return { error: false };
              } else {
                return { error: true, mensaje: 'Error no se ha podido cambiar el último id ticket' };
              }
            } else {
              return { error: true, mensaje: 'Error, no se ha podido borrar la cesta' };
            }
        }
      } else {
        return { error: true, mensaje: "Operación denegada o cancelada" };
      }
    } else {
      return { error: true, mensaje: 'Backend: Error, no hay resultado de paytef' };
    }
  }
}

const paytefInstance = new PaytefClass();
export { paytefInstance };
