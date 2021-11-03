// 100%
import { ArticulosInterface } from "./articulos.interface";
import * as schArticulos from "./articulos.mongodb";

export class Articulos {
    public estadoTarifaVIP: boolean;
    constructor() {
        this.estadoTarifaVIP = false;
    }

    setEstadoTarifaEspecial(payload: boolean) {
        this.estadoTarifaVIP = payload;
    }

    getEstadoTarifaEspecial() {
        return this.estadoTarifaVIP;
    }

    /* Devuelve un articulo */
    async getInfoArticulo(idArticulo: number): Promise<ArticulosInterface> {
        if(!this.getEstadoTarifaEspecial()) {
            return await schArticulos.getInfoArticulo(idArticulo);
        } else {
            return await schArticulos.getInfoArticuloTarifaEspecial(idArticulo);
        }
    }

    insertarArticulos(arrayArticulos) {
        return schArticulos.insertarArticulos(arrayArticulos).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
const articulosInstance = new Articulos();
export { articulosInstance };