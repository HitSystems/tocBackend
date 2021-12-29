import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { parametrosInstance } from '../parametros/parametros.clase';
import { articulosInstance } from '../articulos/articulos.clase';
import { cestas } from '../cestas/cestas.clase';
import { tecladoInstance } from './teclado.clase';
import { ofertas } from 'src/promociones/promociones.clase';


@Controller('teclado')
export class TecladoController {
    @Post('clickTeclaArticulo')
    clickTecla(@Body() params) {
        return cestas.addItem(params.idArticulo, params.idBoton, params.peso, params.infoPeso, params.idCesta).then((res) => {
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
    @Post('actualizarTeclado')
    actualizarArticulos() {
        return tecladoInstance.actualizarTeclado();
    }
}
