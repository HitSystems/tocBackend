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
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const parametros_clase_1 = require("../parametros/parametros.clase");
const clientes_clase_1 = require("./clientes.clase");
let ClientesController = class ClientesController {
    buscarCliente(params) {
        return clientes_clase_1.clienteInstance.buscar(params.busqueda);
    }
    getClienteByID(params) {
        console.log(params);
        if (params.idCliente != undefined) {
            return clientes_clase_1.clienteInstance.getClienteByID(params.idCliente).then((res) => {
                if (res != null) {
                    return { error: false, infoCliente: res };
                }
                else {
                    return { error: true, mensaje: 'Error. Este cliente no existe en la BBDD' };
                }
            }).catch((err) => {
                console.log(err);
                return { error: true, mensaje: 'Error en getClienteByID' };
            });
        }
        else {
            return { error: true, mensaje: 'Error, faltan datos' };
        }
        return clientes_clase_1.clienteInstance.buscar(params.busqueda);
    }
    comprobarVIP(params) {
        const parametros = parametros_clase_1.parametrosInstance.getParametros();
        return axios_1.default.post('clientes/comprobarVIP', { database: parametros.database, idClienteFinal: params.idClienteFinal }).then((res) => {
            if (res.data.error === false) {
                return { error: false, info: res.data.info };
            }
            else {
                return { error: true, mensaje: res.data.mensaje };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Error en backend comprobarVIP' };
        });
    }
};
__decorate([
    (0, common_1.Post)('buscar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "buscarCliente", null);
__decorate([
    (0, common_1.Post)('getClienteByID'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "getClienteByID", null);
__decorate([
    (0, common_1.Post)('comprobarVIP'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "comprobarVIP", null);
ClientesController = __decorate([
    (0, common_1.Controller)('clientes')
], ClientesController);
exports.ClientesController = ClientesController;
//# sourceMappingURL=clientes.controller.js.map