import { Body, Controller, Post } from '@nestjs/common';
import { trabajadoresInstance } from './trabajadores.clase';

@Controller('trabajadores')
export class TrabajadoresController {
    @Post('getTrabajadoresFichados')
    getTrabajadoresFichados() {
        return trabajadoresInstance.getTrabajadoresFichados().then((res) => {
            if (res.length > 0) {
                return {
                    error: false,
                    res: res
                }
            } else {
                return {
                    error: false,
                    res: []
                }
            }
        }).catch((err) => {
            console.log(err);
            return {
                error: true
            }
        });
    }

    @Post('setActivo')
    setTrabajadorActivo(@Body() params) {
        console.log('viene: ', params);
        return trabajadoresInstance.setCurrentTrabajadorPorNombre(params.nombre).then((res) => {
            if (res) {
                return {
                    error: false,
                }
            } else {
                return { error: true };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true };
        });
    }

    @Post('getCurrentTrabajador')
    getCurrentTrabajador() {
        return trabajadoresInstance.getCurrentTrabajador().then((res) => {
            if (res != null) {
                return {
                    error: false,
                    trabajador: res
                }
            } else {
                return { error: true };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true };
        });
    }

    @Post('buscar')
    buscar(@Body() params) {
        console.log("JA: ", params.busqueda)
        return trabajadoresInstance.buscar(params.busqueda);
    }

    @Post('fichar')
    fichar(@Body() params) {
        return trabajadoresInstance.ficharTrabajador(params.idTrabajador).then((res) => {
            if (res) {
                return { error: false };
            } else {
                return { error: true, mensaje: 'Error en ficharTrabajador()' };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Error, mirar consola nest' };
        });
    }

    @Post('desfichar')
    desfichar(@Body() params) {
        return trabajadoresInstance.desficharTrabajador(params.idTrabajador).then((res) => {
            if (res) {
                return { error: false };
            } else {
                return { error: true, mensaje: 'Error en desficharTrabajador()' };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Error, mirar consola nest' };
        });
    }
}
