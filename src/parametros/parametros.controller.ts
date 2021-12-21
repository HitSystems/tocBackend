import { Body, Controller, Post, Get } from '@nestjs/common';
import { parametrosInstance } from "./parametros.clase";
@Controller('parametros')
export class ParametrosController {
    @Post('todoInstalado')
    todoInstalado() {
        const res = parametrosInstance.todoInstalado();
        if (res) {
            const respuestaParametros = parametrosInstance.getParametros();
            return {
                todoInstalado: true,
                config: respuestaParametros
            };
        } else {
            return { todoInstalado: false };
        }
    }

    @Post('getParametros')
    getParametros() {
        const parametros = parametrosInstance.getParametros();
        return { error: false, parametros };      
    }

    @Post('vidAndPid')
    vidAndPid(@Body() params) {
        if (params != undefined || params != null) {
            if (params.vid != undefined || params.vid != null || params.pid != undefined || params.pid != null) {
                return parametrosInstance.setVidAndPid(params.vid, params.pid).then((res) => {
                    if (res) {
                        return { error: false };
                    } else {
                        return { error: true, mensaje: 'Backend: parametros/vidAndPid setVidAndPid no se ha podido guardar' };
                    }
                }).catch((err) => {
                    console.log(err);
                    return { error: true, mensaje: 'Backend: parametros/vidAndPid setVidAndPid catch' };
                });
            } else {
                return { error: true, mensaje: 'Backend: parametros/vidAndPid faltan datos' };
            }
        } else {
            return { error: true, mensaje: 'Backend: parametros/vidAndPid faltan todos los datos' };
        }
    }

    @Get('getVidAndPid')
    getVidAndPid() {
        return parametrosInstance.getEspecialParametros().then((res) => {
            if (res.impresoraUsbInfo != undefined || res.impresoraUsbInfo != null) {
                return { error: false, info: res };
            } else {
                return { error: true, mensaje: 'Backend: impresoraUsbInfo no definido en MongoDB' };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Backend: Error en getVidAndPid CATCH' };
        }); 
    }

}
