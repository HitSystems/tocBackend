"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trabajadoresInstance = exports.TrabajadoresClase = void 0;
const global_clase_1 = require("../global/global.clase");
const socket_1 = require("../conexion/socket");
const schTrabajadores = require("./trabajadores.mongodb");
const parametros_clase_1 = require("../parametros/parametros.clase");
const cestas_clase_1 = require("../cestas/cestas.clase");
class TrabajadoresClase {
    buscar(busqueda) {
        return schTrabajadores.buscar(busqueda).then((res) => {
            if (res.length > 0) {
                return res;
            }
            else {
                return [];
            }
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }
    actualizarTrabajadores() {
        global_clase_1.globalInstance.setStopNecesario(true);
        const params = parametros_clase_1.parametrosInstance.getParametros();
        socket_1.socket.emit('descargar-trabajadores', { licencia: params.licencia, database: params.database, codigoTienda: params.codigoTienda });
    }
    getCurrentIdTrabajador() {
        return schTrabajadores.getCurrentIdTrabajador().then((resultado) => {
            if (resultado != null) {
                return resultado.idCurrentTrabajador;
            }
            else {
                return null;
            }
        }).catch((err) => {
            console.log(err);
            return null;
        });
        ;
    }
    getCurrentTrabajador() {
        return this.getCurrentIdTrabajador().then((idCurrentTrabajador) => {
            if (idCurrentTrabajador != null) {
                return this.getTrabajador(idCurrentTrabajador);
            }
            else {
                return null;
            }
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }
    setCurrentTrabajador(idTrabajador) {
        return schTrabajadores.setCurrentIdTrabajador(idTrabajador).then((res) => {
            if (res.acknowledged) {
                parametros_clase_1.parametrosInstance.actualizarParametros();
                return true;
            }
            else {
                return false;
            }
            ;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    setCurrentTrabajadorPorNombre(id) {
        return schTrabajadores.getTrabajadorPorNombre(id).then((infoTrabajador) => {
            if (infoTrabajador != null) {
                return schTrabajadores.setCurrentIdTrabajador(infoTrabajador._id).then((res) => {
                    if (res.acknowledged) {
                        parametros_clase_1.parametrosInstance.actualizarParametros();
                        return true;
                    }
                    else {
                        console.log(123);
                        return false;
                    }
                    ;
                }).catch((err) => {
                    console.log(err);
                    return false;
                });
            }
            else {
                console.log(321);
                return false;
            }
        }).catch((err) => {
            console.log(987);
            return false;
        });
    }
    getTrabajadoresFichados() {
        return schTrabajadores.getTrabajadoresFichados();
    }
    getTrabajador(idTrabajador) {
        return schTrabajadores.getTrabajador(idTrabajador);
    }
    ficharTrabajador(idTrabajador) {
        return schTrabajadores.ficharTrabajador(idTrabajador).then((res) => {
            if (res.acknowledged) {
                return this.setCurrentTrabajador(idTrabajador).then((resSetCurrent) => {
                    if (resSetCurrent) {
                        return this.nuevoFichajesSincro("ENTRADA", idTrabajador).then((res2) => {
                            if (res2.acknowledged) {
                                cestas_clase_1.cestas.crearNuevaCesta(idTrabajador.toString()).then((data) => {
                                    cestas_clase_1.cestas.updateIdCestaTrabajador(idTrabajador.toString());
                                });
                                return true;
                            }
                            else {
                                return false;
                            }
                        }).catch((err) => {
                            console.log(err);
                            return false;
                        });
                    }
                    return false;
                }).catch((err) => {
                    console.log(err);
                    return false;
                });
            }
            else {
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    desficharTrabajador(idTrabajador) {
        return schTrabajadores.desficharTrabajador(idTrabajador).then((res) => {
            if (res.acknowledged) {
                return this.nuevoFichajesSincro("SALIDA", idTrabajador).then((res2) => {
                    if (res2.acknowledged) {
                        cestas_clase_1.cestas.eliminarCesta(idTrabajador).then((res) => {
                            console.log(res);
                        });
                        return true;
                    }
                    else {
                        console.log(123);
                        return false;
                    }
                }).catch((err) => {
                    console.log(err);
                    return false;
                });
            }
            else {
                console.log(432);
                return false;
            }
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    nuevoFichajesSincro(tipo, idTrabajador) {
        const auxTime = new Date();
        const objGuardar = {
            _id: Date.now(),
            infoFichaje: {
                idTrabajador: idTrabajador,
                fecha: {
                    year: auxTime.getFullYear(),
                    month: auxTime.getMonth(),
                    day: auxTime.getDate(),
                    hours: auxTime.getHours(),
                    minutes: auxTime.getMinutes(),
                    seconds: auxTime.getSeconds()
                }
            },
            tipo: tipo,
            enviado: false,
            enTransito: false,
            intentos: 0,
            comentario: ''
        };
        return schTrabajadores.insertNuevoFichaje(objGuardar);
    }
    getFichados() {
        return schTrabajadores.buscarTrabajadoresFichados().then((arrayFichados) => {
            return arrayFichados;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }
    insertarTrabajadores(arrayTrabajadores) {
        return schTrabajadores.insertarTrabajadores(arrayTrabajadores).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    getFichajeMasAntiguo() {
        return schTrabajadores.getFichajeMasAntiguo();
    }
    actualizarEstadoFichaje(fichaje) {
        return schTrabajadores.actualizarEstadoFichaje(fichaje).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
exports.TrabajadoresClase = TrabajadoresClase;
exports.trabajadoresInstance = new TrabajadoresClase();
//# sourceMappingURL=trabajadores.clase.js.map