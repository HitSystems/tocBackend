import { CestasInterface } from './cestas.interface';
export declare class CestaClase {
    private cesta;
    private udsAplicar;
    constructor();
    getCesta(idCesta: number): Promise<CestasInterface>;
    getCestaRandom(): Promise<CestasInterface>;
    reiniciarCesta(idCestaBorrar: any): Promise<CestasInterface>;
    nuevaCestaVacia(): CestasInterface;
    getTodasCestas(): Promise<CestasInterface[]>;
    borrarCesta(idCestaBorrar: any): Promise<boolean>;
    eliminarCesta(nombreCesta: any): Promise<boolean>;
    setCesta(cesta: CestasInterface): Promise<boolean>;
    crearNuevaCesta(nombreCesta: string, idCestaSincro?: any): Promise<boolean | CestasInterface>;
    updateIdCestaTrabajador(id: string): Promise<boolean>;
    borrarItemCesta(idCesta: number, idArticulo: number): Promise<boolean | CestasInterface>;
    limpiarCesta(unaCesta: CestasInterface, posicionPrincipal: number, posicionSecundario: number, sobraCantidadPrincipal: number, sobraCantidadSecundario: number, pideDelA: number, pideDelB: number): Promise<CestasInterface>;
    insertarArticuloCesta(infoArticulo: any, unidades: number, idCesta: number, infoAPeso?: any): Promise<CestasInterface>;
    addItem(idArticulo: number, idBoton: string, aPeso: boolean, infoAPeso: any, idCesta: number, unidades?: number): Promise<CestasInterface>;
    setUnidadesAplicar(unidades: number): void;
    recalcularIvas(cesta: CestasInterface): Promise<CestasInterface>;
    borrarArticulosCesta(idCesta: number): Promise<boolean | CestasInterface>;
    insertarCestas(cestas: any): Promise<any>;
}
declare const cestas: CestaClase;
export { cestas };
