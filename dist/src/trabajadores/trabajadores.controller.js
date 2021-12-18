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
exports.TrabajadoresController = void 0;
const common_1 = require("@nestjs/common");
const trabajadores_clase_1 = require("./trabajadores.clase");
let TrabajadoresController = class TrabajadoresController {
    getTrabajadoresFichados() {
        return trabajadores_clase_1.trabajadoresInstance.getTrabajadoresFichados().then((res) => {
            if (res.length > 0) {
                return {
                    error: false,
                    res: res
                };
            }
            else {
                return {
                    error: false,
                    res: []
                };
            }
        }).catch((err) => {
            console.log(err);
            return {
                error: true
            };
        });
    }
    setTrabajadorActivo(params) {
        return trabajadores_clase_1.trabajadoresInstance.setCurrentTrabajadorPorNombre(params.nombre).then((res) => {
            if (res) {
                return {
                    error: false,
                };
            }
            else {
                return { error: true };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true };
        });
    }
    getCurrentTrabajador() {
        return trabajadores_clase_1.trabajadoresInstance.getCurrentTrabajador().then((res) => {
            if (res != null) {
                return {
                    error: false,
                    trabajador: res
                };
            }
            else {
                return { error: true };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true };
        });
    }
    buscar(params) {
        return trabajadores_clase_1.trabajadoresInstance.buscar(params.busqueda);
    }
    fichar(params) {
        if (params.idTrabajador != undefined) {
            return trabajadores_clase_1.trabajadoresInstance.ficharTrabajador(params.idTrabajador).then((res) => {
                if (res) {
                    return { error: false };
                }
                else {
                    return { error: true, mensaje: 'Error en ficharTrabajador()' };
                }
            }).catch((err) => {
                console.log(err);
                return { error: true, mensaje: 'Error, mirar consola nest' };
            });
        }
        else {
            return { error: true, mensaje: 'Backend: Faltan datos en trabajadores/fichar' };
        }
    }
    desfichar(params) {
        return trabajadores_clase_1.trabajadoresInstance.desficharTrabajador(params.idTrabajador).then((res) => {
            if (res) {
                return { error: false };
            }
            else {
                return { error: true, mensaje: 'Error en desficharTrabajador()' };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Error, mirar consola nest' };
        });
    }
};
__decorate([
    (0, common_1.Post)('getTrabajadoresFichados'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrabajadoresController.prototype, "getTrabajadoresFichados", null);
__decorate([
    (0, common_1.Post)('setActivo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrabajadoresController.prototype, "setTrabajadorActivo", null);
__decorate([
    (0, common_1.Post)('getCurrentTrabajador'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrabajadoresController.prototype, "getCurrentTrabajador", null);
__decorate([
    (0, common_1.Post)('buscar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrabajadoresController.prototype, "buscar", null);
__decorate([
    (0, common_1.Post)('fichar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrabajadoresController.prototype, "fichar", null);
__decorate([
    (0, common_1.Post)('desfichar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrabajadoresController.prototype, "desfichar", null);
TrabajadoresController = __decorate([
    (0, common_1.Controller)('trabajadores')
], TrabajadoresController);
exports.TrabajadoresController = TrabajadoresController;
//# sourceMappingURL=trabajadores.controller.js.map