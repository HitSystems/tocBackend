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
      return axios.post(`http://10.129.${limpiarNombreTienda(params.nombreTienda)}.29:8887/transaction/start`, {
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
    }
}

const paytefInstance = new PaytefClass();
export { paytefInstance };
