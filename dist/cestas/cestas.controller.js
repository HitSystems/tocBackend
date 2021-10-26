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
exports.CestasController = void 0;
const common_1 = require("@nestjs/common");
const cestas_clase_1 = require("./cestas.clase");
let CestasController = class CestasController {
    borrarCesta(params) {
        return cestas_clase_1.cestas.borrarCesta(params.id).then((res) => {
            if (res) {
                return cestas_clase_1.cestas.getTodasCestas().then((listaCestas) => {
                    if (listaCestas.length > 0) {
                        return {
                            okey: true,
                            cestaNueva: listaCestas[0],
                        };
                    }
                    else {
                        const nueva = cestas_clase_1.cestas.nuevaCestaVacia();
                        return cestas_clase_1.cestas.setCesta(nueva).then((resultado) => {
                            if (resultado) {
                                return {
                                    okey: true,
                                    cestaNueva: nueva,
                                };
                            }
                            else {
                                return {
                                    okey: false,
                                    error: "Error en crear nueva cesta"
                                };
                            }
                        });
                    }
                }).catch((err) => {
                    return {
                        okey: false,
                        error: "Error en getTodasCestas"
                    };
                });
            }
            else {
                return {
                    okey: false,
                    error: "Error borrando cesta"
                };
            }
        }).catch((err) => {
            return {
                okey: false,
                error: "Error en borrarCesta"
            };
        });
    }
    borrarItemCesta(params) {
        return cestas_clase_1.cestas.borrarItemCesta(params._id, params.idArticulo).then((res) => {
            return {
                okey: true,
                cestaNueva: res
            };
        }).catch((err) => {
            return {
                okey: false,
                error: "Error en borrarItemCesta"
            };
        });
    }
    getCesta() {
        return cestas_clase_1.cestas.getCestaRandom().then((res) => {
            return res;
        }).catch((err) => {
            return {
                okey: false,
                error: "Error en borrarItemCesta"
            };
        });
    }
    setUnidadesAplicar(params) {
        cestas_clase_1.cestas.setUnidadesAplicar(params.unidades);
        return { okey: true };
    }
    clickTeclaArticulo(params) {
        return cestas_clase_1.cestas.addItem(params.idArticulo, params.idBoton, params.peso, params.infoPeso, params.idCesta).then((res) => {
            return {
                error: false,
                bloqueado: false,
                cesta: res
            };
        }).catch((err) => {
            return {
                error: true,
                bloqueado: false
            };
        });
    }
};
__decorate([
    (0, common_1.Post)('borrarCesta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CestasController.prototype, "borrarCesta", null);
__decorate([
    (0, common_1.Post)('borrarItemCesta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CestasController.prototype, "borrarItemCesta", null);
__decorate([
    (0, common_1.Post)('getCesta'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CestasController.prototype, "getCesta", null);
__decorate([
    (0, common_1.Post)('setUnidadesAplicar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CestasController.prototype, "setUnidadesAplicar", null);
__decorate([
    (0, common_1.Post)('clickTeclaArticulo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CestasController.prototype, "clickTeclaArticulo", null);
CestasController = __decorate([
    (0, common_1.Controller)('cestas')
], CestasController);
exports.CestasController = CestasController;
//# sourceMappingURL=cestas.controller.js.map