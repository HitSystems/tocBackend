"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paytefInstance = void 0;
const axios_1 = require("axios");
class PaytefClass {
    iniciarTransaccion(cantidad, idTicket, idCesta) {
        return axios_1.default.post('http://10.129.118.29:8887/transaction/start', {
            pinpad: "*",
            opType: "sale",
            cardNumberHashDomain: "branch",
            createReceipt: true,
            executeOptions: {
                method: "polling"
            },
            language: "es",
            requestedAmount: Math.trunc(cantidad * 100),
            requireConfirmation: false,
            transactionReference: `${idTicket}@${idCesta}`
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
}
const paytefInstance = new PaytefClass();
exports.paytefInstance = paytefInstance;
//# sourceMappingURL=paytef.class.js.map