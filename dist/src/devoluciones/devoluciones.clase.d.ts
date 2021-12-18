import { DevolucionesInterface } from "./devoluciones.interface";
export declare class Devoluciones {
    nuevaDevolucion(total: number, idCesta: number): Promise<boolean>;
    getDevolucionMasAntigua(): Promise<import("bson").Document>;
    actualizarEstadoDevolucion(devolucion: DevolucionesInterface): Promise<boolean>;
    private insertarDevolucion;
}
export declare const devolucionesInstance: Devoluciones;
