import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { clienteInstance } from '../clientes/clientes.clase';
import { articulosInstance } from './articulos.clase';

@Controller('articulos')
export class ArticulosController {
    @Post('getArticulo')
    getArticulo(@Body() params) {
        return articulosInstance.getInfoArticulo(params.idArticulo).then((res) => {
            if (res != null) {
                return { error: false, info: res };
            } else {
                return { error: true, mensaje: 'Backend: Error, el articulo es null' };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Backend: Error en articulos/getArticulo catch' };
        });
    }

    @Post('setEstadoTarifaVIP')
    setEstadoTarifaEspecial(@Body() params) {
        if (params.nuevoEstado != undefined && params.nuevoEstado != null) {
            articulosInstance.setEstadoTarifaEspecial(params.nuevoEstado);
            clienteInstance.setEstadoClienteVIP(false);
            return { error: false };
        } else {
            return { error: true, mensaje: 'Backend: Faltan datos en articulos/setEstadoTarifaVIP' };
        }
    }
}
