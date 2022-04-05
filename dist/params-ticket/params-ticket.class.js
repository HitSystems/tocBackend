"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsTicketInstance = exports.ParamsTicketClass = void 0;
const schParamsTicket = __importStar(require("./params-ticket.mongo"));
class ParamsTicketClass {
    insertarParametrosTicket(data) {
        return schParamsTicket.insertarParametrosTicket(data).then((res) => {
            if (res) {
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
    getParamsTicket() {
        return schParamsTicket.getParamsTicket().then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }
}
exports.ParamsTicketClass = ParamsTicketClass;
exports.paramsTicketInstance = new ParamsTicketClass();
//# sourceMappingURL=params-ticket.class.js.map