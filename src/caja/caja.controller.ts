import { Controller, Post, Body } from '@nestjs/common';
import { cajaInstance } from './caja.clase';

@Controller('caja')
export class CajaController {
    @Post('cerrarCaja')
    async cerrarCaja(@Body() params) {
        console.log("Soy cerrar caja");
        const cajaAbierta = await cajaInstance.cajaAbierta();
        if (params.total != undefined, params.detalle != undefined, params.infoDinero != undefined, params.cantidad3G != undefined) {
            if (cajaAbierta) {
                return cajaInstance.cerrarCaja(
                    params.total,
                    params.detalle,
                    params.infoDinero,
                    params.cantidad3G
                ).then((res) => {
                    if (res) {
                        return { error: false };
                    } else {
                        return { error: true };
                    }
                }).catch((err) => {
                    return { error: true };
                });
            } else {
                return { error: true, mensaje: 'No hay ninguna caja abierta' };
            }
        } else {
            return { error: true, mensaje: 'Backend: Faltan datos en caja/cerrarCaja' };
        }
    }

    @Post('abrirCaja')
    abrirCaja(@Body() params) { // No probado! Se le pasa solo el array de monedas
        console.log("Soy abrir caja");
        return cajaInstance.abrirCaja(params).then((res) => {
            if (res) {
                return { error: false };
            } else {
                return { error: true };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true };
        });
    }

    @Post('estadoCaja')
    estadoCaja() { // No probado! Se le pasa solo el array de monedas
        return cajaInstance.cajaAbierta().then((res) => {
            if (res) {
                return { abierta: true, error: false };
            } else {
                return { abierta: false, error: false };
            }
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Backend: Error en caja/estadoCaja CATCH' };
        });
    }
}
