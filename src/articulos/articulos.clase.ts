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
}
const articulosInstance = new Articulos();
export { articulosInstance };