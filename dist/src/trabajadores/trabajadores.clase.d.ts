import { SincroFichajesInterface, TrabajadoresInterface } from "./trabajadores.interface";
export declare class TrabajadoresClase {
    buscar(busqueda: string): Promise<any[] | TrabajadoresInterface[]>;
    actualizarTrabajadores(): void;
    getCurrentIdTrabajador(): Promise<any>;
    getCurrentTrabajador(): Promise<TrabajadoresInterface>;
    setCurrentTrabajador(idTrabajador: number): Promise<boolean>;
    setCurrentTrabajadorPorNombre(nombre: string): Promise<boolean>;
    getTrabajadoresFichados(): Promise<import("bson").Document[]>;
    getTrabajador(idTrabajador: number): Promise<TrabajadoresInterface>;
    ficharTrabajador(idTrabajador: number): Promise<boolean>;
    desficharTrabajador(idTrabajador: number): Promise<boolean>;
    nuevoFichajesSincro(tipo: "ENTRADA" | "SALIDA", idTrabajador: number): Promise<import("mongodb").InsertOneResult<import("bson").Document>>;
    getFichados(): Promise<TrabajadoresInterface[]>;
    insertarTrabajadores(arrayTrabajadores: any): Promise<boolean>;
    getFichajeMasAntiguo(): Promise<import("bson").Document>;
    actualizarEstadoFichaje(fichaje: SincroFichajesInterface): Promise<boolean>;
}
export declare const trabajadoresInstance: TrabajadoresClase;
