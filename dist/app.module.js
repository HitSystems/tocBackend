"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const articulos_controller_1 = require("./articulos/articulos.controller");
const teclado_controller_1 = require("./teclado/teclado.controller");
const cestas_controller_1 = require("./cestas/cestas.controller");
const parametros_controller_1 = require("./parametros/parametros.controller");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const tickets_controller_1 = require("./tickets/tickets.controller");
const trabajadores_controller_1 = require("./trabajadores/trabajadores.controller");
const menus_controller_1 = require("./menus/menus.controller");
const caja_controller_1 = require("./caja/caja.controller");
const clientes_controller_1 = require("./clientes/clientes.controller");
const impresora_controller_1 = require("./impresora/impresora.controller");
const sockets_gateway_1 = require("./sockets.gateway");
const devoluciones_controller_1 = require("./devoluciones/devoluciones.controller");
const movimientos_controller_1 = require("./movimientos/movimientos.controller");
const pruebas_controller_1 = require("./pruebas/pruebas.controller");
const instalador_controller_1 = require("./instalador/instalador.controller");
const familias_controller_1 = require("./familias/familias.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public')
            })
        ],
        controllers: [
            articulos_controller_1.ArticulosController,
            menus_controller_1.MenusController,
            teclado_controller_1.TecladoController,
            cestas_controller_1.CestasController,
            parametros_controller_1.ParametrosController,
            tickets_controller_1.TicketsController,
            trabajadores_controller_1.TrabajadoresController, caja_controller_1.CajaController, clientes_controller_1.ClientesController, impresora_controller_1.ImpresoraController, devoluciones_controller_1.DevolucionesController, movimientos_controller_1.MovimientosController, pruebas_controller_1.PruebasController, instalador_controller_1.InstaladorController, familias_controller_1.FamiliasController
        ],
        providers: [sockets_gateway_1.SocketGateway]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map