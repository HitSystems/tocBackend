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
exports.TecladoController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const parametros_clase_1 = require("../parametros/parametros.clase");
const articulos_clase_1 = require("../articulos/articulos.clase");
const cestas_clase_1 = require("../cestas/cestas.clase");
const teclado_clase_1 = require("./teclado.clase");
let TecladoController = class TecladoController {
    clickTecla(params) {
        return cestas_clase_1.cestas.addItem(params.idArticulo, params.idBoton, params.peso, params.infoPeso, params.idCesta).then((res) => {
            return {
                error: false,
                bloqueado: false,
                cesta: res
            };
        }).catch((err) => {
            console.log(err);
            return {
                error: true,
                mensaje: "Error en addItem"
            };
        });
    }
    actualizarArticulos() {
        return axios_1.default.post('articulos/descargarArticulosEspeciales', { database: parametros_clase_1.parametrosInstance.getParametros().database, codigoCliente: parametros_clase_1.parametrosInstance.getParametros().codigoTienda }).then((res) => {
            if (res.data.error == false) {
                return articulos_clase_1.articulosInstance.insertarArticulos(res.data.info).then((res2) => {
                    if (res2) {
                        return axios_1.default.post('/teclas/descargarTeclados', { database: parametros_clase_1.parametrosInstance.getParametros().database, licencia: parametros_clase_1.parametrosInstance.getParametros().licencia }).then((infoTeclados) => {
                            if (infoTeclados.data.error == false) {
                                return teclado_clase_1.tecladoInstance.insertarTeclas(infoTeclados.data.info).then((resultado) => {
                                    if (resultado) {
                                        return { error: false, mensaje: '' };
                                    }
                                    else {
                                        return { error: true, mensaje: 'Backend: Error teclado/actualizarTeclado 2' };
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                    return { error: true, mensaje: 'Backend: Error teclado/actualizarTeclado try catch' };
                                });
                            }
                            else {
                                return { error: true, mensaje: infoTeclados.data.mensaje };
                            }
                        }).catch((err) => {
                            console.log(err);
                            return { error: true, mensaje: 'Backend: teclado/actualizarTeclado error en segundo post catch' };
                        });
                    }
                    else {
                        return { error: true, mensaje: 'Error backend en actualizarTeclado/insertarArticulos' };
                    }
                }).catch((err) => {
                    console.log(err);
                    return { error: true, mensaje: 'Error backend en actualizarTeclado/insertarArticulos CATCH' };
                });
            }
            else {
                return { error: true, mensaje: res.data.mensaje };
            }
        }).catch((err) => {
            console.log(err);
            return {
                error: true,
                mensaje: 'Backend: Error en catch actualizarArticulos'
            };
        });
    }
};
__decorate([
    (0, common_1.Post)('clickTeclaArticulo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TecladoController.prototype, "clickTecla", null);
__decorate([
    (0, common_1.Post)('actualizarTeclado'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TecladoController.prototype, "actualizarArticulos", null);
TecladoController = __decorate([
    (0, common_1.Controller)('teclado')
], TecladoController);
exports.TecladoController = TecladoController;
//# sourceMappingURL=teclado.controller.js.map