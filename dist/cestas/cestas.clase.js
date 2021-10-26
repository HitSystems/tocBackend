"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cestas = exports.CestaClase = void 0;
const schCestas = require("./cestas.mongodb");
const funciones_1 = require("../funciones/funciones");
const articulos_clase_1 = require("../articulos/articulos.clase");
const promociones_clase_1 = require("../promociones/promociones.clase");
const caja_clase_1 = require("../caja/caja.clase");
class CestaClase {
    constructor() {
        schCestas.getUnaCesta().then((respuesta) => {
            if (respuesta != undefined && respuesta != null && respuesta.lista.length != 0 && respuesta._id != null) {
                for (let i = 0; i < respuesta.lista.length; i++) {
                    respuesta.lista[i].subtotal = Number(respuesta.lista[i].subtotal.toFixed(2));
                }
                this.cesta = respuesta;
            }
            else {
                this.cesta = (0, funciones_1.crearCestaVacia)();
            }
        });
        this.udsAplicar = 1;
    }
    getCesta(idCesta) {
        return schCestas.getCestaConcreta(idCesta);
    }
    getCestaRandom() {
        return schCestas.getUnaCesta().then((cesta) => {
            if (cesta != null) {
                return cesta;
            }
            else {
                console.log("Entro aquí");
                const nueva = this.nuevaCestaVacia();
                return this.setCesta(nueva).then((resultado) => {
                    if (resultado) {
                        return nueva;
                    }
                    else {
                        throw "Error al crear nueva cesta vacía (por que no hay ninguna)";
                    }
                }).catch((err) => {
                    throw err;
                });
            }
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }
    reiniciarCesta(idCestaBorrar) {
        return this.borrarCesta(idCestaBorrar).then(() => {
            return this.getTodasCestas().then((res) => {
                if (res.length > 0) {
                    return res[0];
                }
                else {
                    const nuevaCesta = this.nuevaCestaVacia();
                    this.setCesta(nuevaCesta);
                    return nuevaCesta;
                }
            });
        });
    }
    nuevaCestaVacia() {
        const nuevaCesta = {
            _id: Date.now(),
            tiposIva: {
                base1: 0,
                base2: 0,
                base3: 0,
                valorIva1: 0,
                valorIva2: 0,
                valorIva3: 0,
                importe1: 0,
                importe2: 0,
                importe3: 0
            },
            lista: []
        };
        return nuevaCesta;
    }
    getTodasCestas() {
        return schCestas.getAllCestas();
    }
    borrarCesta(idCestaBorrar) {
        return schCestas.borrarCesta(idCestaBorrar).then((res) => {
            if (res.acknowledged) {
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
    setCesta(cesta) {
        for (let i = 0; i < cesta.lista.length; i++) {
            cesta.lista[i].subtotal = Number(cesta.lista[i].subtotal.toFixed(2));
        }
        return schCestas.setCesta(cesta).then((res) => {
            if (res.acknowledged) {
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
    borrarItemCesta(idCesta, idArticulo) {
        return this.getCesta(idCesta).then((cesta) => {
            for (let i = 0; i < cesta.lista.length; i++) {
                if (cesta.lista[i]._id == idArticulo) {
                    cesta.lista.splice(i, 1);
                    break;
                }
            }
            this.setCesta(cesta).then((result) => {
                if (result) {
                    return cesta;
                }
                else {
                    return false;
                }
            }).catch((err) => {
                console.log(err);
                return false;
            });
            return cesta;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    async limpiarCesta(unaCesta, posicionPrincipal, posicionSecundario, sobraCantidadPrincipal, sobraCantidadSecundario, pideDelA, pideDelB) {
        if (pideDelA != -1) {
            if (sobraCantidadPrincipal > 0) {
                const datosArticulo = await articulos_clase_1.articulosInstance.getInfoArticulo(unaCesta.lista[posicionPrincipal]._id);
                unaCesta.lista[posicionPrincipal].unidades = sobraCantidadPrincipal;
                unaCesta.lista[posicionPrincipal].subtotal = sobraCantidadPrincipal * datosArticulo.precioConIva;
            }
            else {
                unaCesta.lista.splice(posicionPrincipal, 1);
            }
        }
        if (pideDelB != -1) {
            if (sobraCantidadSecundario > 0) {
                const datosArticulo = await articulos_clase_1.articulosInstance.getInfoArticulo(unaCesta.lista[posicionSecundario]._id);
                unaCesta.lista[posicionSecundario].unidades = sobraCantidadSecundario;
                unaCesta.lista[posicionSecundario].subtotal = sobraCantidadSecundario * datosArticulo.precioConIva;
            }
            else {
                if (posicionSecundario > posicionPrincipal) {
                    unaCesta.lista.splice(posicionSecundario - 1, 1);
                }
                else {
                    unaCesta.lista.splice(posicionSecundario, 1);
                }
            }
        }
        return unaCesta;
    }
    async insertarArticuloCesta(infoArticulo, unidades, idCesta, infoAPeso = null) {
        var miCesta = await this.getCesta(idCesta);
        console.log("El ID de la cesta es: ", idCesta);
        if (miCesta.lista.length > 0) {
            let encontrado = false;
            for (let i = 0; i < miCesta.lista.length; i++) {
                if (miCesta.lista[i]._id === infoArticulo._id) {
                    var viejoIva = miCesta.tiposIva;
                    if (infoAPeso == null) {
                        miCesta.lista[i].unidades += unidades;
                        miCesta.lista[i].subtotal += unidades * infoArticulo.precioConIva;
                        miCesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticulo, unidades, viejoIva);
                    }
                    else {
                        miCesta.lista[i].subtotal += infoAPeso.precioAplicado;
                        miCesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticulo, unidades, viejoIva, infoAPeso);
                    }
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                if (infoAPeso == null) {
                    miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: unidades * infoArticulo.precioConIva });
                    miCesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticulo, unidades, miCesta.tiposIva);
                }
                else {
                    miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: infoAPeso.precioAplicado });
                    miCesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
                }
            }
        }
        else {
            if (infoAPeso == null) {
                miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: unidades * infoArticulo.precioConIva });
                miCesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticulo, unidades, miCesta.tiposIva);
            }
            else {
                miCesta.lista.push({ _id: infoArticulo._id, nombre: infoArticulo.nombre, unidades: unidades, promocion: { esPromo: false, _id: null }, subtotal: infoAPeso.precioAplicado });
                miCesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticulo, unidades, miCesta.tiposIva, infoAPeso);
            }
        }
        return await promociones_clase_1.ofertas.buscarOfertas(miCesta, viejoIva);
    }
    async addItem(idArticulo, idBoton, aPeso, infoAPeso, idCesta) {
        var unidades = this.udsAplicar;
        var cestaRetornar = null;
        if (caja_clase_1.cajaInstance.cajaAbierta()) {
            try {
                if (!aPeso) {
                    let infoArticulo = await articulos_clase_1.articulosInstance.getInfoArticulo(idArticulo);
                    if (infoArticulo) {
                        cestaRetornar = await this.insertarArticuloCesta(infoArticulo, unidades, idCesta);
                    }
                    else {
                    }
                }
                else {
                    cestaRetornar = await this.insertarArticuloCesta(infoAPeso.infoArticulo, 1, idCesta, infoAPeso);
                }
            }
            catch (err) {
                console.log(err);
                this.udsAplicar = 1;
            }
        }
        else {
        }
        this.udsAplicar = 1;
        return cestaRetornar;
    }
    setUnidadesAplicar(unidades) {
        this.udsAplicar = unidades;
    }
    async recalcularIvas(cesta) {
        cesta.tiposIva = {
            base1: 0,
            base2: 0,
            base3: 0,
            valorIva1: 0,
            valorIva2: 0,
            valorIva3: 0,
            importe1: 0,
            importe2: 0,
            importe3: 0
        };
        for (let i = 0; i < cesta.lista.length; i++) {
            if (cesta.lista[i].promocion.esPromo === false) {
                let infoArticulo = await articulos_clase_1.articulosInstance.getInfoArticulo(cesta.lista[i]._id);
                cesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticulo, cesta.lista[i].unidades, cesta.tiposIva);
            }
            else if (cesta.lista[i].promocion.esPromo === true) {
                if (cesta.lista[i].nombre == 'Oferta combo') {
                    let infoArticuloPrincipal = await articulos_clase_1.articulosInstance.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                    infoArticuloPrincipal.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal / (cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                    cesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticuloPrincipal, cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);
                    let infoArticuloSecundario = await articulos_clase_1.articulosInstance.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idSecundario);
                    infoArticuloSecundario.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealSecundario / (cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadSecundario);
                    cesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticuloSecundario, cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadSecundario, cesta.tiposIva);
                }
                else {
                    if (cesta.lista[i].nombre == 'Oferta individual') {
                        let infoArticulo = await articulos_clase_1.articulosInstance.getInfoArticulo(cesta.lista[i].promocion.infoPromo.idPrincipal);
                        infoArticulo.precioConIva = cesta.lista[i].promocion.infoPromo.precioRealPrincipal / (cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal);
                        cesta.tiposIva = (0, funciones_1.construirObjetoIvas)(infoArticulo, cesta.lista[i].promocion.infoPromo.unidadesOferta * cesta.lista[i].promocion.infoPromo.cantidadPrincipal, cesta.tiposIva);
                    }
                }
            }
        }
        return cesta;
    }
}
exports.CestaClase = CestaClase;
const cestas = new CestaClase();
exports.cestas = cestas;
//# sourceMappingURL=cestas.clase.js.map