export declare class Impresora {
    imprimirTicket(idTicket: number): Promise<void>;
    private _venta;
    imprimirSalida(cantidad: number, fecha: number, nombreTrabajador: string, nombreTienda: string, concepto: string, tipoImpresora: string, codigoBarras: string): void;
    imprimirEntrada(totalIngresado: number, fecha: number, nombreDependienta: string): void;
    imprimirCaja(calaixFet: any, nombreTrabajador: any, descuadre: any, nClientes: any, recaudado: any, arrayMovimientos: any[], nombreTienda: any, fI: any, fF: any, cInicioCaja: any, cFinalCaja: any, tipoImpresora: any): void;
    abrirCajon(): void;
}
export declare const impresoraInstance: Impresora;
