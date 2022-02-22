"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paytefInstance = void 0;
const axios_1 = require("axios");
const parametros_clase_1 = require("../parametros/parametros.clase");
function limpiarNombreTienda(cadena) {
    const devolver = Number(cadena.replace(/\D/g, ''));
    if (isNaN(devolver) == false) {
        return devolver;
    }
    else {
        return 0;
    }
}
class PaytefClass {
    iniciarTransaccion(cantidad, idTicket, idCesta) {
        const params = parametros_clase_1.parametrosInstance.getParametros();
        if (params.ipTefpay != undefined && params.ipTefpay != null) {
            return axios_1.default.post(`http://${params.ipTefpay}:8887/transaction/start`, {
                pinpad: "*",
                opType: "sale",
                cardNumberHashDomain: "branch",
                createReceipt: true,
                executeOptions: {
                    method: "polling"
                },
                language: "es",
                requestedAmount: Math.round(cantidad * 100),
                requireConfirmation: false,
                transactionReference: `${idTicket}@${idCesta}`,
                showResultSeconds: 5
            }).then((res) => {
                if (res.data.info.started) {
                    return true;
                }
                else {
                    return false;
                }
            }).catch((err) => {
                console.log(err);
                return false;
            });
        }
        else {
            const devFalse = new Promise((dev, rej) => {
                dev(false);
            });
            return devFalse;
        }
    }
}
const paytefInstance = new PaytefClass();
exports.paytefInstance = paytefInstance;
//# sourceMappingURL=paytef.class.js.map