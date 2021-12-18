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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametrosController = void 0;
const common_1 = require("@nestjs/common");
const parametros_clase_1 = require("./parametros.clase");
let ParametrosController = class ParametrosController {
    todoInstalado() {
        const res = parametros_clase_1.parametrosInstance.todoInstalado();
        if (res) {
            const respuestaParametros = parametros_clase_1.parametrosInstance.getParametros();
            return {
                todoInstalado: true,
                config: respuestaParametros
            };
        }
        else {
            return { todoInstalado: false };
        }
    }
    getParametros() {
        const parametros = parametros_clase_1.parametrosInstance.getParametros();
        return { error: false, parametros };
    }
};
__decorate([
    (0, common_1.Post)('todoInstalado'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParametrosController.prototype, "todoInstalado", null);
__decorate([
    (0, common_1.Post)('getParametros'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParametrosController.prototype, "getParametros", null);
ParametrosController = __decorate([
    (0, common_1.Controller)('parametros')
], ParametrosController);
exports.ParametrosController = ParametrosController;
//# sourceMappingURL=parametros.controller.js.map