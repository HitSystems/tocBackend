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
exports.CajaController = void 0;
const common_1 = require("@nestjs/common");
const caja_clase_1 = require("./caja.clase");
let CajaController = class CajaController {
    async cerrarCaja(params) {
        console.log("Soy cerrar caja");
        const cajaAbierta = await caja_clase_1.cajaInstance.cajaAbierta();
        if (params.total != undefined, params.detalle != undefined, params.infoDinero != undefined, params.cantidad3G != undefined) {
            if (cajaAbierta) {
                return caja_clase_1.cajaInstance.cerrarCaja(params.total, params.detalle, params.infoDinero, params.cantidad3G).then((res) => {
                    if (res) {
                        return { error: false };
                    }
                    else {
                        return { error: true };
                    }
                }).catch((err) => {
                    return { error: true };
                });
            }
            else {
                return { error: true, mensaje: 'No hay ninguna caja abierta' };
            }
        }
        else {
            return { error: true, mensaje: 'Backend: Faltan datos en caja/cerrarCaja' };
        }
    }
    abrirCaja(params) {
        console.log("Soy abrir caja");
        return caja_clase_1.cajaInstance.abrirCaja(params).then((res) => {
            if (res) {
                return { error: false };
            }
            else {
                return { error: true };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true };
        });
    }
    estadoCaja() {
        return caja_clase_1.cajaInstance.cajaAbierta().then((res) => {
            if (res) {
                return { abierta: true, error: false };
            }
            else {
                return { abierta: false, error: false };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Backend: Error en caja/estadoCaja CATCH' };
        });
    }
};
__decorate([
    (0, common_1.Post)('cerrarCaja'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CajaController.prototype, "cerrarCaja", null);
__decorate([
    (0, common_1.Post)('abrirCaja'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "abrirCaja", null);
__decorate([
    (0, common_1.Post)('estadoCaja'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "estadoCaja", null);
CajaController = __decorate([
    (0, common_1.Controller)('caja')
], CajaController);
exports.CajaController = CajaController;
//# sourceMappingURL=caja.controller.js.map