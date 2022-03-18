import { Body, Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';
import { UtilesModule } from 'src/utiles/utiles.module';
import { parametrosInstance } from '../parametros/parametros.clase';
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

    @Get('polling')
    comprobarEstado() {
        const ipDatafono = parametrosInstance.getParametros().ipTefpay;
        return axios.post(`http://${ipDatafono}:8887/transaction/poll`, {
          pinpad: "*"
        }).then((res: any) => {
            if (res.data.info.transactionStatus === 'finished') {
                return { error: false, info: false };
            } else {
                return { error: false, info: true };
            }
        }).catch((err) => {
            console.log(err.message);
            return { error: true, mensaje: err.message };
        });
    }

    @Post('resultadoFinal')
    async resultadoFinal(@Body() params) {
        if (UtilesModule.checkVariable(params.idClienteFinal)) {
            try {
                const ipDatafono = parametrosInstance.getParametros().ipTefpay;
                const resPaytef = await axios.post(`http://${ipDatafono}:8887/transaction/poll`, {
                    pinpad: "*"
                });
                return paytefInstance.checkPagado(resPaytef.data, params.idClienteFinal);
            } catch(err) {
                console.log(err);
                return { error: true, mensaje: 'Backend: Error en paytef/resultadoFinal CATCH' };
            }
        } else {
            return { error: true, mensaje: 'Backend: Error, faltan datos en paytef/resultadoFinal' };
        }
    }
}
