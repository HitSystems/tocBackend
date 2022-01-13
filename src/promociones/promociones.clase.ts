// 100%

import { clienteInstance } from "../clientes/clientes.clase";
import { articulosInstance } from "../articulos/articulos.clase";
import {cestas} from "../cestas/cestas.clase";
import { CestasInterface } from "../cestas/cestas.interface";
import { PromocionesInterface } from "./promociones.interface";
import * as schPromociones from "./promociones.mongodb";

export class OfertasClase {
    private promociones: PromocionesInterface[];

    /* Inicializa las promociones en su variable privada */
    constructor() {
        schPromociones.getPromociones().then((arrayPromos: PromocionesInterface[]) => {
            if(arrayPromos.length > 0) {
                this.promociones = arrayPromos;
            } else {
                this.promociones = [];
            }
        });        
    }

    /* Deshacer ofertas de la cesta. Actualmente no hace nada */
    deshacerOfertas(cesta: CestasInterface) {
        return cesta;
    }

    /* Comprueba si el artículo necesario para la promoción existe en la cesta */
    existeArticuloParaOfertaEnCesta(cesta: CestasInterface, idArticulo: number, unidadesNecesarias: number) {
        for(let i = 0; i < cesta.lista.length; i++) {
            if(cesta.lista[i]._id === idArticulo && cesta.lista[i].unidades >= unidadesNecesarias) {
                return i;
            }
        }
        return -1; //IMPORTANTE QUE SEA ESTE VALOR SINO HAY SECUNDARIO
    }

    /* Aplica las promociones en la cesta de todo tipo, tanto individuales como combos */
    async teLoAplicoTodo(necesariasPrincipal: number, necesariasSecundario: number, cesta: CestasInterface, posicionPrincipal: number, posicionSecundario: number, pideDelA: number, pideDelB: number, precioPromo: number, idPromo: string) {
        let numeroPrincipal     = 0;
        let numeroSecundario    = 0;
        let sobranPrincipal     = 0;
        let sobranSecundario    = 0;
        let nVeces              = 0;

        var idPrincipal         = (typeof cesta.lista[posicionPrincipal] !== "undefined") ? cesta.lista[posicionPrincipal]._id: 0;
        var idSecundario        = (typeof cesta.lista[posicionSecundario] !== "undefined") ? cesta.lista[posicionSecundario]._id: 0;

        if(pideDelA !== -1 && pideDelB !== -1)
        {
            numeroPrincipal          = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
            numeroSecundario         = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
            nVeces                   = Math.trunc(Math.min(numeroPrincipal, numeroSecundario));
            sobranPrincipal          = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;
            sobranSecundario         = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;

            cesta = await cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
            cesta = await this.insertarLineaPromoCestaCombo(cesta, 1, nVeces, precioPromo*nVeces, idPromo, idPrincipal, idSecundario, necesariasPrincipal, necesariasSecundario);
        }
        else
        {
            if(pideDelA !== -1 && pideDelB === -1)
            {
                numeroPrincipal = cesta.lista[posicionPrincipal].unidades/necesariasPrincipal;
                nVeces          = Math.trunc(numeroPrincipal);
                sobranPrincipal = cesta.lista[posicionPrincipal].unidades-nVeces*necesariasPrincipal;

                cesta = await cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                cesta = await this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo*nVeces*necesariasPrincipal, idPromo, idPrincipal, necesariasPrincipal);
            }
            else
            {
                if(pideDelA === -1 && pideDelB !== -1)
                {
                    numeroSecundario = cesta.lista[posicionSecundario].unidades/necesariasSecundario;
                    nVeces          = Math.trunc(numeroSecundario);
                    sobranSecundario = cesta.lista[posicionSecundario].unidades-nVeces*necesariasSecundario;

                    cesta = await cestas.limpiarCesta(cesta, posicionPrincipal, posicionSecundario, sobranPrincipal, sobranSecundario, pideDelA, pideDelB);
                    cesta = await this.insertarLineaPromoCestaIndividual(cesta, 2, nVeces, precioPromo*nVeces*necesariasSecundario, idPromo, idPrincipal, necesariasPrincipal); //se trata como si fueran principales
                }
            }
        }
        return cesta;
    }

    /* Busca ofertas que se pueden aplicar en la cesta */
    async buscarOfertas(unaCesta: CestasInterface, viejoIva): Promise<CestasInterface> {
        var hayOferta = false;
        unaCesta = this.deshacerOfertas(unaCesta); //ahora no hace nada
        if (clienteInstance.getEstadoClienteVIP() == false) {
            for(let i = 0; i < this.promociones.length; i++)
            {
                for(let j = 0; j < this.promociones[i].principal.length; j++)
                {
                    let preguntaPrincipal = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].principal[j]._id, this.promociones[i].cantidadPrincipal)
                    if(this.promociones[i].principal[j]._id === -1 || preguntaPrincipal >= 0)
                    {
                        for(let z = 0; z < this.promociones[i].secundario.length; z++)
                        {
                            let preguntaSecundario = this.existeArticuloParaOfertaEnCesta(unaCesta, this.promociones[i].secundario[z]._id, this.promociones[i].cantidadSecundario);
                            if(this.promociones[i].secundario[z]._id === -1 || preguntaSecundario >= 0)
                            {
                                unaCesta = await this.teLoAplicoTodo(this.promociones[i].cantidadPrincipal, this.promociones[i].cantidadSecundario, unaCesta, preguntaPrincipal, preguntaSecundario, this.promociones[i].principal[j]._id, this.promociones[i].secundario[z]._id, this.promociones[i].precioFinal, this.promociones[i]._id);
                                hayOferta = true;
                                break;
                            }
                        }
                    }
                   
                }
            }
            if(hayOferta)
            {
                unaCesta.tiposIva = viejoIva; //No se suma IVA en la promoción para calcularlo en la siguiente línea.
                unaCesta = await cestas.recalcularIvas(unaCesta);
            }
        }

        cestas.setCesta(unaCesta);
        return unaCesta;
    }

    /* Inserta la línea de la oferta combinada en la cesta */
    async insertarLineaPromoCestaCombo(cesta: CestasInterface, tipoPromo: number, unidades: number, total: number, idPromo: string, idPrincipal: number, idSecundario: number, cantidadPrincipal: number, cantidadSecundario: number) {
        var dtoAplicado = await this.calcularPrecioRealCombo(tipoPromo, idPrincipal, idSecundario, cantidadPrincipal, cantidadSecundario, unidades, total);

        if(tipoPromo === 1) //COMBO
        {
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
        return cesta
    }

    /* Inserta la línea de la oferta individual en la cesta */
    async insertarLineaPromoCestaIndividual(cesta: CestasInterface, tipoPromo: number, unidades: number, total: number, idPromo: string, idPrincipal: number, cantidadPrincipal: number) {
        var dtoAplicado = await this.calcularPrecioRealIndividual(tipoPromo, idPrincipal, cantidadPrincipal, unidades, total);

        if(tipoPromo === 2) //INDIVIDUAL
        {
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
                        cantidadSecundario: 0, //si es 0 no existe
                        precioRealPrincipal: dtoAplicado.precioRealPrincipal,
                        precioRealSecundario: 0,
                        unidadesOferta: unidades,
                        tipoPromo: 'INDIVIDUAL'
                    }
                }
            });
        }
        
        return cesta
    }

    /* Calcula el precio real que tienen los artículos de una promoción tipo combo. Se reparten en porcentaje */
    async calcularPrecioRealCombo(tipoPromo: number, idPrincipal: number, idSecundario: number, cantidadPrincipal: number, cantidadSecundario: number, unidadesOferta: number, precioTotalOferta: number) {
        let precioSinOfertaPrincipal    = 0;
        let precioSinOfertaSecundario   = 0;
        let precioTotalSinOferta        = 0;
        if(idPrincipal != 0)
        {
            precioSinOfertaPrincipal = (await articulosInstance.getInfoArticulo(idPrincipal)).precioConIva;
        }

        if(idSecundario != 0)
        {
            precioSinOfertaSecundario = (await articulosInstance.getInfoArticulo(idSecundario)).precioConIva;
        }

        if(tipoPromo === 1) //COMBO
        {
            precioTotalSinOferta = (precioSinOfertaPrincipal*cantidadPrincipal + precioSinOfertaSecundario*cantidadSecundario)*unidadesOferta;
        }

        var dto = (precioTotalSinOferta-precioTotalOferta)/precioTotalSinOferta;
        
        return {
            precioRealPrincipal: Math.round((precioSinOfertaPrincipal - (precioSinOfertaPrincipal*dto))*unidadesOferta *100)/100,
            precioRealSecundario: Math.round((precioSinOfertaSecundario - (precioSinOfertaSecundario*dto))*unidadesOferta*100)/100
        };
    }

    /* Calcula el precio real que tienen los artículos de una promoción tipo individual. Se reparten dividido sus unidades */
    async calcularPrecioRealIndividual(tipoPromo: number, idPrincipal: number, cantidadPrincipal: number, unidadesOferta: number, precioTotalOferta: number) {
        let precioSinOfertaPrincipal    = 0;
        let precioTotalSinOferta        = 0;
        if(idPrincipal != 0)
        {
            precioSinOfertaPrincipal = (await articulosInstance.getInfoArticulo(idPrincipal)).precioConIva;
        }

        if(tipoPromo === 2) //INDIVIDUAL
        {
            if(idPrincipal != 0)
            {
                precioTotalSinOferta = precioSinOfertaPrincipal*cantidadPrincipal*unidadesOferta;
            }
        }
        
        var dto = (precioTotalSinOferta-precioTotalOferta)/precioTotalSinOferta;
        
        return {
            precioRealPrincipal: Math.round((precioSinOfertaPrincipal - (precioSinOfertaPrincipal*dto))*unidadesOferta*cantidadPrincipal*100)/100
        };
    }

    /* Inserta un array de promociones en la base de datos. Se utiliza al instalar una licencia o para actualizar teclado */
    /* También renueva la variable privada de promociones */
    insertarPromociones(arrayPromociones) {
        return schPromociones.insertarPromociones(arrayPromociones).then((res) => {
            if (res) {
                this.promociones = arrayPromociones;
            }
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }

    /* Petición de descarga de promociones. También renueva la variable privada de promociones (siempre se utiliza esta) */
    descargarPromociones() {
        return schPromociones.getPromociones().then((arrayPromos: PromocionesInterface[]) => {
            if(arrayPromos.length > 0) {
                this.promociones = arrayPromos;
                return this.insertarPromociones(arrayPromos).then((res) => {
                    return res;
                }).catch((err) => {
                    console.log(err);
                    return false;
                });
            } else {
                this.promociones = [];
                return true;
            }            
        }).catch((err) => {
            console.log(err);
            return false;
        });    
    }
}

const ofertas = new OfertasClase();

export { ofertas }