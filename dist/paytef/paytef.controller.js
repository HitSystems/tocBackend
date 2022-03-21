"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaytefController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const utiles_module_1 = require("../utiles/utiles.module");
const parametros_clase_1 = require("../parametros/parametros.clase");
const tickets_clase_1 = require("../tickets/tickets.clase");
const paytef_class_1 = require("./paytef.class");
let PaytefController = class PaytefController {
    async iniciarTransaccion(params) {
        if (params != undefined || params != null) {
            if (params.cantidad != null || params.cantidad != undefined && params.idCesta != null || params.idCesta != undefined) {
                try {
                    var nuevoIdTicket = (await tickets_clase_1.ticketsInstance.getUltimoTicket()) + 1;
                }
                catch (err) {
                    console.log(err);
                    return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion iniciarTransaccion() CATCH 2' };
                }
                return paytef_class_1.paytefInstance.iniciarTransaccion(params.cantidad, nuevoIdTicket, params.idCesta).then((res) => {
                    if (res) {
                        return { error: false };
                    }
                    else {
                        return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion iniciarTransaccion() ERROR' };
                    }
                });
            }
            else {
                return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan datos' };
            }
        }
        else {
            return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan todos los datos' };
        }
    }
    comprobarEstado() {
        const ipDatafono = parametros_clase_1.parametrosInstance.getParametros().ipTefpay;
        return axios_1.default.post(`http://${ipDatafono}:8887/transaction/poll`, {
            pinpad: "*"
        }).then((res) => {
            if (res.data.info.transactionStatus === 'finished') {
                return { error: false, info: false };
            }
            else {
                return { error: false, info: true };
            }
        }).catch((err) => {
            console.log(err.message);
            return { error: true, mensaje: err.message };
        });
    }
    async resultadoFinal(params) {
        if (utiles_module_1.UtilesModule.checkVariable(params.idClienteFinal)) {
            try {
                const ipDatafono = parametros_clase_1.parametrosInstance.getParametros().ipTefpay;
                const resPaytef = await axios_1.default.post(`http://${ipDatafono}:8887/transaction/poll`, {
                    pinpad: "*"
                });
                return paytef_class_1.paytefInstance.checkPagado(resPaytef.data, params.idClienteFinal);
            }
            catch (err) {
                console.log(err);
                return { error: true, mensaje: 'Backend: Error en paytef/resultadoFinal CATCH' };
            }
        }
        else {
            return { error: true, mensaje: 'Backend: Error, faltan datos en paytef/resultadoFinal' };
        }
    }
};
__decorate([
    (0, common_1.Post)('iniciarTransaccion'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaytefController.prototype, "iniciarTransaccion", null);
__decorate([
    (0, common_1.Get)('polling'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaytefController.prototype, "comprobarEstado", null);
__decorate([
    (0, common_1.Post)('resultadoFinal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaytefController.prototype, "resultadoFinal", null);
PaytefController = __decorate([
    (0, common_1.Controller)('paytef')
], PaytefController);
exports.PaytefController = PaytefController;
//# sourceMappingURL=paytef.controller.js.map