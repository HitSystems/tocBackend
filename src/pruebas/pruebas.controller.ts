import { Controller, Post, Body } from '@nestjs/common';
import { socketInterno } from '../sockets.gateway';
import { socket } from '../sanPedro';
import axios from 'axios';

@Controller('pruebas')
export class PruebasController {
    @Post('test')
    test(@Body() params) {
        // ese.test();
        // return axios.post('clientes/comprobarVIP', { idCliente: 'CliBoti_000_{A83B364B-252F-464B-B0C3-AA89DA258F64}', parametros: {
        //     database: 'Fac_Tena'
        //   } }).then((res) => {
        //     return res.data;
        // });
        return axios.post('datos/test');

    }
}
