import { Controller, Post, Body } from '@nestjs/common';
import { articulosInstance } from './articulos.clase';

@Controller('articulos')
export class ArticulosController {
    @Post('getArticulo')
    getArticulo(@Body() params) {
        const lol = articulosInstance.getInfoArticulo(params.idArticulo);
        return lol;
    }
}
