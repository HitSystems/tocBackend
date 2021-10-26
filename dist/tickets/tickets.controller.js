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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_clase_1 = require("./tickets.clase");
const caja_clase_1 = require("../caja/caja.clase");
let TicketsController = class TicketsController {
    getTicketsIntervalo(params) {
        return caja_clase_1.cajaInstance.getInfoCaja().then((infoCaja) => {
            if (infoCaja != null) {
                return tickets_clase_1.ticketsInstance.getTicketsIntervalo(infoCaja.inicioTime, Date.now());
            }
            else {
                return [];
            }
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }
    crearTicketEfectivo(params) {
        if (params.total != undefined && params.idCesta != undefined && params.idCliente != undefined) {
            return tickets_clase_1.ticketsInstance.crearTicketEfectivo(params.total, params.idCesta, params.idCliente).then((res) => {
                if (res) {
                    return {
                        error: false
                    };
                }
                else {
                    return {
                        error: true,
                        mensaje: 'Error en crearTicketEfectivo'
                    };
                }
            }).catch((err) => {
                console.log(err);
                return {
                    error: true,
                    mensaje: 'Error. Comprobar log nest'
                };
            });
        }
        else {
            return { error: true, mensaje: 'Faltan datos' };
        }
    }
    crearTicketDatafono3G(params) {
        if (params.total != undefined && params.idCesta != undefined && params.idCliente != undefined) {
            return tickets_clase_1.ticketsInstance.crearTicketDatafono3G(params.total, params.idCesta, params.idCliente).then((res) => {
                if (res) {
                    return {
                        error: false
                    };
                }
                else {
                    return {
                        error: true,
                        mensaje: 'Error en crearTicketDatafono3G'
                    };
                }
            }).catch((err) => {
                console.log(err);
                return {
                    error: true,
                    mensaje: 'Error. Comprobar log nest'
                };
            });
        }
        else {
            return { error: true, mensaje: 'Faltan datos' };
        }
    }
};
__decorate([
    (0, common_1.Post)('getTicketsIntervalo'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "getTicketsIntervalo", null);
__decorate([
    (0, common_1.Post)('crearTicketEfectivo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "crearTicketEfectivo", null);
__decorate([
    (0, common_1.Post)('crearTicketDatafono3G'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "crearTicketDatafono3G", null);
TicketsController = __decorate([
    (0, common_1.Controller)('tickets')
], TicketsController);
exports.TicketsController = TicketsController;
//# sourceMappingURL=tickets.controller.js.map