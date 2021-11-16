import { Controller, Post, Body, Get } from '@nestjs/common';
import { cestas } from './cestas.clase';
import { articulosInstance } from '../articulos/articulos.clase';

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
        return cestas.borrarArticulosCesta(params.id).then((res) => {
            return {
                okey: true,
                cestaNueva: res,
            }
        }).catch((err) => {
            console.log(err);
            return {
                okey: false,
                error: 'Error en borrarArticulosCesta'
            }
        })
    }

    @Post('getCesta')
    getCesta(@Body() params) {
        // params.id = 1631781881687; // para postman
        console.log(params.id)
        if(params.id === -1) {
            return cestas.getCestaRandom().then((res) => {
                return res;
            }).catch((err) => {
                return {
                    okey: false,
                    error: "Error en borrarItemCesta"
                };
            });
        }
        return cestas.getCesta(params.id).then((res) => {
            return res;
        }).catch((err) => {
            return {
                okey: false,
                error: "Error en borrarItemCesta"
            };
        });
    }

    @Post('setUnidadesAplicar')
    setUnidadesAplicar(@Body() params) {
        cestas.setUnidadesAplicar(params.unidades);
        return {okey: true};
    }

    @Post('clickTeclaArticulo')
    clickTeclaArticulo(@Body() params) {
        return articulosInstance.getSuplementosArticulo(params.idArticulo).then((res) => {
            if(res === null || params.suplementosOk) {
                console.log(params.suplemento);
                return cestas.addItem(params.idArticulo, params.idBoton, params.peso, params.infoPeso, params.idCesta, params.suplemento, params.unidades).then((res) => {
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
            } else {
                return {
                    error: false,
                    bloqueado: false,
                    modalSuplementos: true,
                    suplementos: res.suplementos,
                }
            }
        });
    }

    @Post('crearCesta')
    crearCesta(@Body() params) {
        return cestas.crearNuevaCesta(params.nombreCesta).then((res) => {
            return {
                error: false,
                bloqueado: false,
                cesta: res,
            }
        }).catch((err) => {
            return {
                error: true,
                bloqueado: false,
            }
        })
    }

    @Get('getCestas')
    getCestas() {
        return cestas.getTodasCestas().then((res) => {
            return {
                error: false,
                bloqueado: false,
                cestas: res,
            };
        }).catch((err) => {
            return {
                error: true,
                bloqueado: false,
            }
        })
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
}
