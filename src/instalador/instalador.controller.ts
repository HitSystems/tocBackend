import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('instalador')
export class InstaladorController {
    @Post('pedirDatos')
    instalador(@Body() params) {
        return axios.post('parametros/instaladorLicencia', {
            password: params.password,
            numLlicencia: params.numLlicencia
        }).then((res: any) => {
            if (!res.data.error) {
                return { error: false, info: res.data.info };
            } else {
                return { error: true, mensaje: res.data.mensaje };
            }
            return { };
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Error en pedir parametros/instaladorLicencia' };
        });
    }
}
