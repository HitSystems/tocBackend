import { CajaInterface } from "./caja.interface";
export declare class CajaClase {
    getInfoCaja(): Promise<CajaInterface>;
    cajaAbierta(): Promise<boolean>;
    abrirCaja(infoApertura: any): Promise<boolean>;
    nuevoItemSincroCajas(caja: CajaInterface): Promise<import("mongodb").InsertOneResult<import("bson").Document>>;
    cerrarCaja(total: number, detalleCierre: any, guardarInfoMonedas: any, totalDatafono3G: number): Promise<boolean>;
    borrarCaja(): Promise<boolean>;
    calcularDatosCaja(unaCaja: CajaInterface): Promise<CajaInterface>;
}
export declare const cajaInstance: CajaClase;
