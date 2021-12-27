"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ofertas = exports.OfertasClase = void 0;
const clientes_clase_1 = require("../clientes/clientes.clase");
const articulos_clase_1 = require("../articulos/articulos.clase");
const cestas_clase_1 = require("../cestas/cestas.clase");
const schPromociones = require("./promociones.mongodb");
class OfertasClase {
    constructor() {
        schPromociones.getPromociones().then((arrayPromos) => {
            if (arrayPromos.length > 0) {
                this.promociones = arrayPromos;
            }
            else {
                this.promociones = [];
            }
        });
    }
    deshacerOfertas(cesta) {
        return cesta;
    }
    existeArticuloParaOfertaEnCesta(cesta, idArticulo, unidadesNecesarias) {
        for (let i = 0; i < cesta.lista.length; i++) {
            if (cesta.lista[i]._id === idArticulo && cesta.lista[i].unidades >= unidadesNecesarias) {
                return i;
            }
        }
        return -1;
    }
    async teLoAplicoTodo(necesariasPrincipal, necesariasSecundario, cesta, posicionPrincipal, posicionSecundario, pideDelA, pideDelB, precioPromo, idPromo) {
        let numeroPrincipal = 0;
        let numeroSecundario = 0;
        let sobranPrincipal = 0;
        let sobranSecundario = 0;
        let nVeces = 0;
        var idPrincipal = (typeof cesta.lista[posicionPrincipal] !== "undefined") ? cesta.lista[posicionPrincipal]._id : 0;
        var idSecundario = (typeof cesta.lista[posicionSecundario] !== "undefined") ? cesta.lista[posicionSecundario]._id : 0;
        if (pideDelA !== -1 && pideDelB !== -1) {
            numeroPrincipal = cesta.lista[posicionPrincipal].unidades / necesariasPrincipal;
            numeroSecundario = cesta.lista[posicionSecundario].unidades / necesariasSecundario;
            nVeces = Math.trunc(Math.min(numeroPrincipal, numeroSecundario));
            sobranPrincipal = cesta.lista[posicionPrincipal].unidades - nVeces * necesariasPrincipal;
            sobranSecundario = cesta.lista[posicionSecundario].unidades - nVeces * necesariasSecundario;
            cesta = await cestas_clase_1.cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
            cesta = await this.insertarLineaPromoCestaCombo(cesta, 1, nVeces, precioPromo * nVeces, idPromo, idPrincipal, idSecundario, necesariasPrincipal, necesariasSecundario);
        }
        else {
            if (pideDelA !== -1 && pideDelB === -1) {
                numeroPrincipal = cesta.lista[posicionPrincipal].unidades / necesariasPrincipal;
                nVeces = Math.trunc(numeroPrincipal);
                sobranPrincipal = cesta.lista[posicionPrincipal].unidades - nVeces * necesariasPrincipal;
                cesta = await cestas_clase_1.cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                cesta = await this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo * nVeces * necesariasPrincipal, idPromo, idPrincipal, necesariasPrincipal);
            }
            else {
                if (pideDelA === -1 && pideDelB !== -1) {
                    numeroSecundario = cesta.lista[posicionSecundario].unidades / necesariasSecundario;
                    nVeces = Math.trunc(numeroSecundario);
                    sobranSecundario = cesta.lista[posicionSecundario].unidades - nVeces * necesariasSecundario;
                    cesta = await cestas_clase_1.cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                    cesta = await this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo * nVeces * necesariasSecundario, idPromo, idPrincipal, necesariasPrincipal);
                }
            }
        }
        return cesta;
    }
    async buscarOfertas(unaCesta, viejoIva) {
        var hayOferta = false;
        unaCesta = this.deshacerOfertas(unaCesta);
        if (clientes_clase_1.clienteInstance.getEstadoClienteVIP() == false) {
            for (let i = 0; i < this.promociones.length; i++) {
                for (let j = 0; j < this.promociones[i].principal.length; j++) {
                    let preguntaPrincipal = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].principal[j]._id, this.promociones[i].cantidadPrincipal);
                    if (this.promociones[i].principal[j]._id === -1 || preguntaPrincipal >= 0) {
                        for (let z = 0; z < this.promociones[i].secundario.length; z++) {
                            let preguntaSecundario = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].secundario[z]._id, this.promociones[i].cantidadSecundario);
                            if (this.promociones[i].secundario[z]._id === -1 || preguntaSecundario >= 0) {
                                unaCesta = await this.teLoAplicoTodo(this.promociones[i].cantidadPrincipal, this.promociones[i].cantidadSecundario, unaCesta, preguntaPrincipal, preguntaSecundario, this.promociones[i].principal[j]._id, this.promociones[i].secundario[z]._id, this.promociones[i].precioFinal, this.promociones[i]._id);
                                hayOferta = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (hayOferta) {
                unaCesta.tiposIva = viejoIva;
                unaCesta = await cestas_clase_1.cestas.recalcularIvas(unaCesta);
            }
        }
        cestas_clase_1.cestas.setCesta(unaCesta);
        return unaCesta;
    }
    async insertarLineaPromoCestaCombo(cesta, tipoPromo, unidades, total, idPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario) {
        var dtoAplicado = await this.calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidades, total);
        if (tipoPromo === 1) {
            cesta.lista.push({
                _id: -2,
                nombre: 'Oferta combo',
                unidades: unidades,
                subtotal: total,
                promocion: {
                    _id: idPromo,
                    esPromo: true,
                    infoPromo: {
                        idPrincipal: idPrincipal,
                        cantidadPrincipal: cantidadPrincipal,
                        idSecundario: idSecundario,
                        cantidadSecundario: cantidadSecundario,
                        precioRealPrincipal: dtoAplicado.precioRealPrincipal,
                        precioRealSecundario: dtoAplicado.precioRealSecundario,
                        unidadesOferta: unidades,
                        tipoPromo: 'COMBO'
                    }
                }
            });
        }
        return cesta;
    }
    async insertarLineaPromoCestaIndividual(cesta, tipoPromo, unidades, total, idPromo, idPrincipal, cantidadPrincipal) {
        var dtoAplicado = await this.calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidades, total);
        if (tipoPromo === 2) {
            cesta.lista.push({
                _id: -2,
                nombre: 'Oferta individual',
                unidades: unidades,
                subtotal: total,
                promocion: {
                    _id: idPromo,
                    esPromo: true,
                    infoPromo: {
                        idPrincipal: idPrincipal,
                        cantidadPrincipal: cantidadPrincipal,
                        idSecundario: 0,
                        cantidadSecundario: 0,
                        precioRealPrincipal: dtoAplicado.precioRealPrincipal,
                        precioRealSecundario: 0,
                        unidadesOferta: unidades,
                        tipoPromo: 'INDIVIDUAL'
                    }
                }
            });
        }
        return cesta;
    }
    async calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidadesOferta, precioTotalOferta) {
        let precioSinOfertaPrincipal = 0;
        let precioSinOfertaSecundario = 0;
        let precioTotalSinOferta = 0;
        if (idPrincipal != 0) {
            precioSinOfertaPrincipal = (await articulos_clase_1.articulosInstance.getInfoArticulo(idPrincipal)).precioConIva;
        }
        if (idSecundario != 0) {
            precioSinOfertaSecundario = (await articulos_clase_1.articulosInstance.getInfoArticulo(idSecundario)).precioConIva;
        }
        if (tipoPromo === 1) {
            precioTotalSinOferta = (precioSinOfertaPrincipal * cantidadPrincipal + precioSinOfertaSecundario * cantidadSecundario) * unidadesOferta;
        }
        var dto = (precioTotalSinOferta - precioTotalOferta) / precioTotalSinOferta;
        return {
            precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal * dto)) * unidadesOferta,
            precioRealSecundario: (precioSinOfertaSecundario - (precioSinOfertaSecundario * dto)) * unidadesOferta
        };
    }
    async calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidadesOferta, precioTotalOferta) {
        let precioSinOfertaPrincipal = 0;
        let precioTotalSinOferta = 0;
        if (idPrincipal != 0) {
            precioSinOfertaPrincipal = (await articulos_clase_1.articulosInstance.getInfoArticulo(idPrincipal)).precioConIva;
        }
        if (tipoPromo === 2) {
            if (idPrincipal != 0) {
                precioTotalSinOferta = precioSinOfertaPrincipal * cantidadPrincipal * unidadesOferta;
            }
        }
        var dto = (precioTotalSinOferta - precioTotalOferta) / precioTotalSinOferta;
        return {
            precioRealPrincipal: (precioSinOfertaPrincipal - (precioSinOfertaPrincipal * dto)) * unidadesOferta * cantidadPrincipal
        };
    }
    insertarPromociones(arrayPromociones) {
        if (arrayPromociones.length === 0)
            return true;
        return schPromociones.insertarPromociones(arrayPromociones).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
exports.OfertasClase = OfertasClase;
const ofertas = new OfertasClase();
exports.ofertas = ofertas;
//# sourceMappingURL=promociones.clase.js.map