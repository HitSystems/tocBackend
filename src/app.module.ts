import { Module } from '@nestjs/common';
import { ArticulosController } from './articulos/articulos.controller';
// import { TeclasMenusController } from './menus/menus.controller';
import { TecladoController } from './teclado/teclado.controller';
import { CestasController } from './cestas/cestas.controller';
import { ParametrosController } from './parametros/parametros.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TicketsController } from './tickets/tickets.controller';
import { TrabajadoresController } from './trabajadores/trabajadores.controller';
import { MenusController } from './menus/menus.controller'; // 100%
import { CajaController } from './caja/caja.controller';
import { ClientesController } from './clientes/clientes.controller';
import { ImpresoraController } from './impresora/impresora.controller';
import { SocketGateway } from './sockets.gateway';
import { DevolucionesController } from './devoluciones/devoluciones.controller';
import { MovimientosController } from './movimientos/movimientos.controller';
import { PruebasController } from './pruebas/pruebas.controller';
import { InstaladorController } from './instalador/instalador.controller';
import { FamiliasController } from './familias/familias.controller';
import { ParamsTicketController } from './params-ticket/params-ticket.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    })
  ],
  controllers: [
    ArticulosController, 
    MenusController,
    TecladoController, 
    CestasController, 
    ParametrosController, 
    TicketsController, 
    TrabajadoresController, CajaController, ClientesController, ImpresoraController, DevolucionesController, MovimientosController, PruebasController, InstaladorController, FamiliasController, ParamsTicketController],
  providers: [SocketGateway]  
})
export class AppModule {}
