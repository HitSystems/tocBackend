import { MovimientosInterface } from "./movimientos.interface";
export declare class MovimientosClase {
    getMovimientosIntervalo(inicioTime: number, finalTime: number): Promise<MovimientosInterface[]>;
    nuevaSalida(cantidad: number, concepto: string, tipoExtra: string, imprimir?: boolean, idTicket?: number): Promise<boolean>;
    nuevaEntrada(cantidad: number, concepto: string, imprimir?: boolean): Promise<boolean>;
    private generarCodigoBarrasSalida;
}
export declare const movimientosInstance: MovimientosClase;
