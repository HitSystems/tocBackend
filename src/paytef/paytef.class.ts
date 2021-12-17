import axios from "axios";
import { socketInterno } from "../sockets.gateway";
import { movimientosInstance } from "../movimientos/movimientos.clase";

class PaytefClass {
    iniciarTransaccion(cantidad: number, idTicket: number, idCesta: number) {
      return axios.post('http://10.129.118.29:8887/transaction/start', {
              pinpad: "*",
              opType: "sale",
              cardNumberHashDomain: "branch",
              createReceipt: true,
              executeOptions: {
                method: "polling"
              },
              language: "es",
              requestedAmount: Math.trunc(cantidad*100),
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