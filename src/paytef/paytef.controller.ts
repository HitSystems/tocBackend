import { Body, Controller, Post } from '@nestjs/common';
import { ticketsInstance } from '../tickets/tickets.clase';
import { paytefInstance } from './paytef.class';

@Controller('paytef')
export class PaytefController {
    @Post('iniciarTransaccion')
    async iniciarTransaccion(@Body() params) {
        if (params != undefined || params != null) {
            if (params.cantidad != null || params.cantidad != undefined && params.idCesta != null || params.idCesta != undefined) {
                try {
                    var nuevoIdTicket = (await ticketsInstance.getUltimoTicket()) + 1;
                } catch(err) {
                    console.log(err);
                    return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion iniciarTransaccion() CATCH 2' };
                }
                return paytefInstance.iniciarTransaccion(params.cantidad, nuevoIdTicket, params.idCesta).then((res) => {
                    if (res) {
                        return { error: false };
                    } else {
                        return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion iniciarTransaccion() ERROR' };
                    }
                });
            } else {
                return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan datos' };
            }
        } else {
            return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan todos los datos' };
        }
    }

    @Post('polling')
    comprobarEstado() {

    }
}
