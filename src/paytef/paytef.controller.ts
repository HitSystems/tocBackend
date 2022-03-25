import { Body, Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';
import { transaccionesInstance } from 'src/transacciones/transacciones.class';
import { TransaccionesInterface } from 'src/transacciones/transacciones.interface';
import { UtilesModule } from 'src/utiles/utiles.module';
import { parametrosInstance } from '../parametros/parametros.clase';
import { ticketsInstance } from '../tickets/tickets.clase';
import { paytefInstance } from './paytef.class';

@Controller('paytef')
export class PaytefController {
    // @Post('iniciarTransaccion')
    // async iniciarTransaccion(@Body() params) {
    //     if (params != undefined || params != null) {
    //         if (UtilesModule.checkVariable(params.cantidad)) {
    //             try {
    //                 var nuevoIdTicket = (await ticketsInstance.getUltimoTicket()) + 1;
    //             } catch(err) {
    //                 console.log(err);
    //                 return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion iniciarTransaccion() CATCH 2' };
    //             }
    //             return paytefInstance.iniciarTransaccion(params.cantidad, nuevoIdTicket, params.idCesta).then((res) => {
    //                 if (res) {
    //                     return { error: false };
    //                 } else {
    //                     return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion iniciarTransaccion() ERROR' };
    //                 }
    //             });
    //         } else {
    //             return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan datos' };
    //         } 
    //     } else {
    //         return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan todos los datos' };
    //     }
    // }
    @Post('iniciarTransaccion')
    async iniciarTransaccion(@Body() params) {
        if (UtilesModule.checkVariable(params)) {
            if (UtilesModule.checkVariable(params.idClienteFinal)) {
                return paytefInstance.iniciarTransaccion(params.idClienteFinal).then((res) => {
                    return res;
                }).catch((err) => {
                    console.log(err.message);
                    return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion CATCH' };
                });
            } else {
                return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan datos' };
            } 
        } else {
            return { error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan todos los datos' };
        }
    }

    @Get('polling')
    async comprobarEstado() {
        const ipDatafono = parametrosInstance.getParametros().ipTefpay;
        const ultimaTransaccion: TransaccionesInterface = await transaccionesInstance.getUltimaTransaccion();
        
        return axios.post(`http://${ipDatafono}:8887/transaction/poll`, {
          pinpad: "*"
        }).then((res: any) => {
            if (res.data.result != null && res.data.result != undefined) {
                if (res.data.result.transactionReference === ultimaTransaccion._id.toString()) {
                    if (res.data.result.approved && !res.data.result.failed) {
                        return paytefInstance.cerrarTicket(res.data.result.transactionReference).then((resCierreTicket) => {
                            if (resCierreTicket.error) {
                                return { error: true, mensaje: resCierreTicket.mensaje };
                            }
                            return { error: false, continuo: false };
                        });                        
                    } else {
                        return { error: true, mensaje: 'Operación denegada' };
                    }                    
                } else {
                    return { error: false, continuo: true };
                }
            } else {
                if (res.data.info != null && res.data.info != undefined) {
                    if (res.data.info.transactionStatus === 'cancelling') {
                        return { error: true, mensaje: 'Operación cancelada' };
                    } else {
                        return { error: false, continuo: true };
                    }
                } else {
                    console.log("Entro en el if else CORRECTO");
                    return { error: false, continuo: true };
                }
            }
            // if (res.data.info.transactionStatus === 'finished') {
            //     console.log("ENTRO EN FINISHED");
            //     console.log("RESULT: ", res.data.result);
            //     console.log("PAYTEF: ", res.data.result.transactionReference, " ULTIMA: ", ultimaTransaccion._id.toString());
                
            //     return { error: false, info: false };
            // } else {
            //     console.log("ENTRO EN CONTINUA");
            //     return { error: false, info: true };
            // }
        }).catch((err) => {
            if (err.message == 'Request failed with status code 500') {
                return { error: false, continuo: true };
            } else {
                console.log(err.message);
                return { error: true, mensaje: "Error catch cobro paytef controller" };
            }            
        });
    }

    // @Get('resultadoFinal')
    // async resultadoFinal() {
    //     try {
    //         const ipDatafono = parametrosInstance.getParametros().ipTefpay;
    //         const resPaytef = await axios.post(`http://${ipDatafono}:8887/transaction/poll`, {
    //             pinpad: "*"
    //         });
    //         return paytefInstance.checkPagado(resPaytef.data);
    //     } catch(err) {
    //         console.log(err);
    //         return { error: true, mensaje: 'Backend: Error en paytef/resultadoFinal CATCH' };
    //     }
    // }
}
