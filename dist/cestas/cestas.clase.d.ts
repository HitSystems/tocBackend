import { CestasInterface } from './cestas.interface';
export declare class CestaClase {
    private cesta;
    private udsAplicar;
    constructor();
    getCesta(idCesta: number): Promise<CestasInterface>;
    getCestaRandom(): Promise<CestasInterface>;
    reiniciarCesta(idCestaBorrar: any): Promise<CestasInterface>;
    nuevaCestaVacia(nombreCesta?: string): CestasInterface;
    crearNuevaCesta(nombreCesta: any): Promise<CestasInterface>;
    getTodasCestas(): Promise<CestasInterface[]>;
    borrarCesta(idCestaBorrar: any): Promise<boolean>;
    setCesta(cesta: CestasInterface): Promise<boolean>;
    borrarItemCesta(idCesta: number, idArticulo: number): Promise<boolean | CestasInterface>;
    borrarArticulosCesta(idCesta: number): Promise<boolean | CestasInterface>;
    limpiarCesta(unaCesta: CestasInterface, posicionPrincipal: number, posicionSecundario: number, sobraCantidadPrincipal: number, sobraCantidadSecundario: number, pideDelA: number, pideDelB: number): Promise<CestasInterface>;
    insertarArticuloCesta(infoArticulo: any, unidades: number, idCesta: number, infoAPeso?: any): Promise<CestasInterface>;
    addItem(idArticulo: number, idBoton: string, aPeso: boolean, infoAPeso: any, idCesta: number, unidades?: number): Promise<CestasInterface>;
    setUnidadesAplicar(unidades: number): void;
    recalcularIvas(cesta: CestasInterface): Promise<CestasInterface>;
}
declare const cestas: CestaClase;
export { cestas };
