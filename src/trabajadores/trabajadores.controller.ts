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
        return trabajadoresInstance.setCurrentTrabajadorPorNombre(params.id).then((res) => {
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
        return trabajadoresInstance.buscar(params.busqueda);
    }

    @Post('fichar')
    fichar(@Body() params) {
        if (params.idTrabajador != undefined) {
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
        } else {
            return { error: true, mensaje: 'Backend: Faltan datos en trabajadores/fichar' };
        }
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
