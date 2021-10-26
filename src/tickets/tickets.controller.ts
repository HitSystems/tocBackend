import { Controller, Post, Body, Query } from '@nestjs/common';
import { ticketsInstance } from './tickets.clase';
import { cajaInstance } from '../caja/caja.clase';

@Controller('tickets')
export class TicketsController {

    @Post('getTicketsIntervalo')
    getTicketsIntervalo(@Query() params) {
        return cajaInstance.getInfoCaja().then((infoCaja) => {
            if (infoCaja != null) {
                return ticketsInstance.getTicketsIntervalo(infoCaja.inicioTime, Date.now());
            } else {
                return [];
            }
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }

    @Post('crearTicketEfectivo')
    crearTicketEfectivo(@Body() params) {
        if (params.total != undefined && params.idCesta != undefined && params.idCliente != undefined) {
            return ticketsInstance.crearTicketEfectivo(params.total, params.idCesta, params.idCliente).then((res) => {
                if (res) {
                    return {
                        error: false
                    }
                } else {
                    return {
                        error: true,
                        mensaje: 'Error en crearTicketEfectivo'
                    }
                }
            }).catch((err) => {
                console.log(err);
                return {
                    error: true,
                    mensaje: 'Error. Comprobar log nest'
                }
            });
        } else {
            return { error: true, mensaje: 'Faltan datos'};
        }
    }

    @Post('crearTicketDatafono3G')
    crearTicketDatafono3G(@Body() params) {
        if (params.total != undefined && params.idCesta != undefined && params.idCliente != undefined) {
            return ticketsInstance.crearTicketDatafono3G(params.total, params.idCesta, params.idCliente).then((res) => {
                if (res) {
                    return {
                        error: false
                    }
                } else {
                    return {
                        error: true,
                        mensaje: 'Error en crearTicketDatafono3G'
                    }
                }
            }).catch((err) => {
                console.log(err);
                return {
                    error: true,
                    mensaje: 'Error. Comprobar log nest'
                }
            });
        } else {
            return { error: true, mensaje: 'Faltan datos'};
        }
    }

    // @Post('crearTicketDatafonoClearOne')
    // crearTicketDatafonoClearOne(@Body() params) {
    //     return ticketsInstance.crearTicketDatafono3G(params.total, params.idCesta).then((res) => {
    //         if (res) {
    //             return {
    //                 error: false
    //             }
    //         } else {
    //             return {
    //                 error: true
    //             }
    //         }
    //     }).catch((err) => {
    //         console.log(err);
    //         return {
    //             error: true
    //         }
    //     });
    // }
}
