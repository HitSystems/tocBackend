export declare class Devoluciones {
    nuevaDevolucion(total: number, idCesta: number): Promise<boolean>;
    private insertarDevolucion;
}
export declare const devolucionesInstance: Devoluciones;
