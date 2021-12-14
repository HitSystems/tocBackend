import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { parametrosInstance } from '../parametros/parametros.clase';
import { articulosInstance } from '../articulos/articulos.clase';
import { cestas } from '../cestas/cestas.clase';
import { tecladoInstance } from './teclado.clase';


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
        return axios.post('articulos/descargarArticulosEspeciales', { database: parametrosInstance.getParametros().database, codigoCliente: parametrosInstance.getParametros().codigoTienda }).then((res: any) => {
            if (res.data.error == false) {
                // return { error: false, info: res.data.info };
                return articulosInstance.insertarArticulos(res.data.info).then((res2) => {
                    if (res2) {
                        return axios.post('/teclas/descargarTeclados', { database: parametrosInstance.getParametros().database, licencia: parametrosInstance.getParametros().licencia }).then((infoTeclados: any) => {
                            if (infoTeclados.data.error == false) {
                                return tecladoInstance.insertarTeclas(infoTeclados.data.info).then((resultado) => {
                                    if (resultado) {
                                        return { error: false, mensaje: '' };
                                    } else {
                                        return { error: true, mensaje: 'Backend: Error teclado/actualizarTeclado 2' };
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                    return { error: true, mensaje: 'Backend: Error teclado/actualizarTeclado try catch' };
                                });
                            } else {
                                return { error: true, mensaje: infoTeclados.data.mensaje };
                            }
                        }).catch((err: any) => {
                            console.log(err);
                            return { error: true, mensaje: 'Backend: teclado/actualizarTeclado error en segundo post catch' };
                        });
                    } else {
                        return { error: true, mensaje: 'Error backend en actualizarTeclado/insertarArticulos' };
                    }
                }).catch((err) => {
                    console.log(err);
                    return { error: true, mensaje: 'Error backend en actualizarTeclado/insertarArticulos CATCH' };
                });
            } else {
                return { error: true, mensaje: res.data.mensaje };
            }
        }).catch((err) => {
            console.log(err);
            return {
                error: true,
                mensaje: 'Backend: Error en catch actualizarArticulos'
            }
        });
    }
}
