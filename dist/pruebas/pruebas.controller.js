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
exports.PruebasController = void 0;
const common_1 = require("@nestjs/common");
const sanPedro_1 = require("../sanPedro");
const tickets_clase_1 = require("../tickets/tickets.clase");
const parametros_clase_1 = require("../parametros/parametros.clase");
let PruebasController = class PruebasController {
    test(params) {
        const parametros = parametros_clase_1.parametrosInstance.getParametros();
        tickets_clase_1.ticketsInstance.getTicketsIntervalo(1, 9999999999999999).then((res) => {
            sanPedro_1.socket.emit('sincroTickets', { arrayTickets: res, parametros });
        }).catch((err) => {
            console.log(err);
        });
    }
};
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PruebasController.prototype, "test", null);
PruebasController = __decorate([
    (0, common_1.Controller)('pruebas')
], PruebasController);
exports.PruebasController = PruebasController;
//# sourceMappingURL=pruebas.controller.js.map