import { Controller, Post, Body, Get } from '@nestjs/common';
import { cestas } from './cestas.clase';

@Controller('cestas')
export class CestasController {
    @Post('borrarCesta')
    borrarCesta(@Body() params) {
        return cestas.borrarCesta(params.id).then((res) => {
            if (res) {
                return cestas.getTodasCestas().then((listaCestas) => {
                    if (listaCestas.length > 0) {
                        return {
                            okey: true,
                            cestaNueva: listaCestas[0],
                        };
                    } else {
                        const nueva = cestas.nuevaCestaVacia();
                        return cestas.setCesta(nueva).then((resultado) => {
                            if (resultado) {
                                return {
                                    okey: true,
                                    cestaNueva: nueva,
                                };
                            } else {
                                return {
                                    okey: false,
                                    error: "Error en crear nueva cesta"
                                };
                            }
                        });
                    }                    
                }).catch((err) => {
                    return {
                        okey: false,
                        error: "Error en getTodasCestas"
                    };
                });
                
            } else {
                return {
                    okey: false,
                    error: "Error borrando cesta"
                };
            }
            
        }).catch((err) => {
            return {
                okey: false,
                error: "Error en borrarCesta"
            };
        });
    }

    @Post('borrarItemCesta')
    borrarItemCesta(@Body() params) {
        return cestas.borrarItemCesta(params._id, params.idArticulo).then((res) => {
            return {
                okey: true,
                cestaNueva: res
            };
        }).catch((err) => {
            return {
                okey: false,
                error: "Error en borrarItemCesta"
            };
        });
    }

    @Post('borrarArticulosCesta')
    borrarArticulosCesta(@Body() params) {
        if (params.idCesta != undefined && params.idCesta != null) {
            return cestas.borrarArticulosCesta(params.idCesta).then((res) => {
                if (res) {
                    return { error: false, info: res };
                }
                return { error: true, mensaje: 'Backend: Error en cestas/borrarArticulosCesta >' };
            });
        } else {
            return { error: true, mensaje: 'Backend: Error cestas/borrarArticulosCesta faltan datos' };
        }
    }

    @Post('getCesta')
    getCesta() {
        // params.id = 1631781881687; // para postman
        // params.idArticulo = 8571;

        return cestas.getCestaRandom().then((res) => {
            return res;
        }).catch((err) => {
            return {
                okey: false,
                error: "Error en borrarItemCesta"
            };
        });
    }

    @Post('getCestaByID')
    getCestaByID(@Body() params) {
        if (params.idCesta != undefined && params.idCesta != null) {
            console.log(params)
            if (params.idCesta == -1) {
                return cestas.getCestaRandom().then((res) => {
                    return { error: false, info: res };
                }).catch((err) => {
                    console.log(err);
                    return { error: true, mensaje: 'Backend: Error en cestas/getCestaByID > getCestaRandom CATCH' };
                });
            } else {
                return cestas.getCesta(params.idCesta).then((res) => {
                    if (res) {
                        return { error: false, info: res };
                    }
                    console.log(res);
                    return { error: true, mensaje: 'Backend: Error en cestas/getCestaByID' };
                }).catch((err) => {
                    console.log(err);
                    return { error: true, mensaje: 'Backend: Error en cestas/getCestaByID CATCH' };
                });
            }
        } else {
            return { error: true, mensaje: 'Backend: Error en cestas/getCestaByID FALTAN DATOS' };
        }
    }

    @Post('crearCesta')
    crearCesta(@Body() params) {
        if (params.nombreCesta != undefined && params.nombreCesta != null) {
            return cestas.crearNuevaCesta(params.nombreCesta).then((res) => {
                if (res) {
                    return { error: false, info: res };
                } else {
                    return { error: true, mensaje: 'Backend: Error en cestas/crearCesta. No se ha podido crear la nueva cesta' };
                }
            })
        } else {
            return { error: true, mensaje: 'Backend: Error en cestas/crearCesta FALTAN DATOS' };
        }
    }

    @Get('getCestas')
    getCestas() {
        return cestas.getTodasCestas().then((res) => {
            return { error: false, info: res };
        }).catch((err) => {
            console.log(err);
            return { error: true, mensaje: 'Backend: Error en cestas/getCestas CATCH' };
        });
    }

    @Post('setUnidadesAplicar')
    setUnidadesAplicar(@Body() params) {
        cestas.setUnidadesAplicar(params.unidades);
        return {okey: true};
    }

    @Post('clickTeclaArticulo')
    clickTeclaArticulo(@Body() params) {
        return cestas.addItem(params.idArticulo, params.idBoton, params.peso, params.infoAPeso, params.idCesta, params.unidades).then((res) => {
            return {
                error: false,
                bloqueado: false,
                cesta: res
            };
        }).catch((err) => {
            return {
                error: true,
                bloqueado: false
            };
        });
    }

    @Post('regalarProducto')
    regalarProducto(@Body() params) {
        if (params.idCesta != undefined && params.index != undefined) {
            return cestas.getCesta(params.idCesta).then((cesta) => {
                if (cesta != null) {
                    cesta.lista[params.index].subtotal = 0;
                    cesta['regalo'] = true;
                    console.log(cesta);
                    return cestas.setCesta(cesta).then((res) => {
                        if (res) {
                            return { error: false, cesta: cesta };
                        }
                        return { error: true, mensaje: 'Backend: Error en cestas/regalarProductos > setCesta'};
                    }).catch((err) => {
                        console.log(err);
                        return { error: true, mensaje: 'Backend: Error en cestas/regalarProductos > setCesta CATCH'};
                    });
                } else {
                    return { error: true, mensaje: 'Backend: Error, cesta vacía'};
                }
            }).catch((err) => {
                console.log(err);
                return { error: true, mensaje: 'Backend: Error en cestas/regalarProducto > getCesta CATCH' };
            });
        } else {
            return { error: true, mensaje: 'Backend: Error: faltan datos en cestas/regalarProducto' };
        }
    }

    @Post('addSuplemento')
    addSuplemento(@Body() params) {
        if(params.idCesta && params.suplementos && params.idArticulo) {
            return cestas.addSuplemento(params.idCesta, params.suplementos, params.idArticulo).then((res) => {
                return {
                    error: false,
                    bloqueado: false,
                    cesta: res
                };
            }).catch((err) => {
                console.log(err);
                return {
                    error: true,
                    bloqueado: false
                };
            });
        }
    }
}
