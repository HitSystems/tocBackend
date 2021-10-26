import { Controller, Post, Body } from '@nestjs/common';
import { cajaInstance } from './caja.clase';

@Controller('caja')
export class CajaController {
    @Post('cerrarCaja')
    cerrarCaja(@Body() params) {
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
    }

    @Post('abrirCaja')
    abrirCaja(@Body() params) { // No probado! Se le pasa solo el array de monedas
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
            return { error: true };
        });
    }
}
