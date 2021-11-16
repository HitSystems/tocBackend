import { Controller, Post, Body } from '@nestjs/common';
import { cestas } from '../cestas/cestas.clase';
import { articulosInstance } from '../articulos/articulos.clase';

@Controller('teclado')
export class TecladoController {
    @Post('clickTeclaArticulo')
    clickTecla(@Body() params) {
        const suplementos = articulosInstance.getSuplementosArticulo(params.idArticulo);
        console.log(params.idArticulo, suplementos);
        return cestas.addItem(params.idArticulo, params.idBoton, params.peso, params.infoPeso, params.idCesta, params.id, params.unidades).then((res) => {
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
}
