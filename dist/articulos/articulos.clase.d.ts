import { ArticulosInterface } from "./articulos.interface";
export declare class Articulos {
    estadoTarifaVIP: boolean;
    constructor();
    setEstadoTarifaEspecial(payload: boolean): void;
    getEstadoTarifaEspecial(): boolean;
    getInfoArticulo(idArticulo: number): Promise<ArticulosInterface>;
    insertarArticulos(arrayArticulos: any, esTarifaEspecial?: boolean): Promise<boolean>;
    getSuplementosArticulo(idArticulo: number): Promise<any>;
    getInfoSuplemento(idArticulo: number, idSuplemento: number): Promise<any>;
}
declare const articulosInstance: Articulos;
export { articulosInstance };
