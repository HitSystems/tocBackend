import { ArticulosInterface } from "./articulos.interface";
export declare class Articulos {
    estadoTarifaVIP: boolean;
    constructor();
    setEstadoTarifaEspecial(payload: boolean): void;
    getEstadoTarifaEspecial(): boolean;
    getInfoArticulo(idArticulo: number): Promise<ArticulosInterface>;
    insertarArticulos(arrayArticulos: any, esTarifaEspecial?: boolean): Promise<boolean>;
    setSuplemento(suplemento: any): void;
    getSuplementos(suplementos: any): Promise<any[]>;
}
declare const articulosInstance: Articulos;
export { articulosInstance };
