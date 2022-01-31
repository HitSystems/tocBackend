import axios from "axios";
import { socketInterno } from "../sockets.gateway";
import { movimientosInstance } from "../movimientos/movimientos.clase";
import { parametrosInstance } from "src/parametros/parametros.clase";

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
          transactionReference: `${idTicket}@${idCesta}`
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
}

const paytefInstance = new PaytefClass();
export { paytefInstance };
