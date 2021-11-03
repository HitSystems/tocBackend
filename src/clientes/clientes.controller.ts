import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { parametrosInstance } from '../parametros/parametros.clase';
import { clienteInstance } from './clientes.clase';

@Controller('clientes')
export class ClientesController {
    @Post('buscar')
    buscarCliente(@Body() params) {
        return clienteInstance.buscar(params.busqueda);
    }

    @Post('getClienteByID')
    getClienteByID(@Body() params) {
        console.log(params);
        if (params.idCliente != undefined) {
            return clienteInstance.getClienteByID(params.idCliente).then((res) => {
                if (res != null) {
                    return {error: false, infoCliente: res}
                } else {
                    return { error: true, mensaje: 'Error. Este cliente no existe en la BBDD' };
                }
            }).catch((err) => {
                console.log(err);
                return { error: true, mensaje: 'Error en getClienteByID'};
            });
        } else {
            return { error: true, mensaje: 'Error, faltan datos' };
        }
        return clienteInstance.buscar(params.busqueda);
    }

    @Post('comprobarVIP')
    comprobarVIP(@Body() params) {
        const parametros = parametrosInstance.getParametros();
        return axios.post('clientes/comprobarVIP', { database: parametros.database, idClienteFinal: params.idClienteFinal }).then((res: any) => {
            if (res.data.error === false) {
                return { error: false, info: res.data.info };
            } else {
                return { error: true, mensaje: res.data.mensaje };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Error en backend comprobarVIP'};
        });
    }    
}
