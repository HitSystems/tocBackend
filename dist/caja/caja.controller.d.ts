export declare class CajaController {
    cerrarCaja(params: any): Promise<{
        error: boolean;
    } | {
        error: boolean;
        mensaje: string;
    }>;
    abrirCaja(params: any): Promise<{
        error: boolean;
    } | {
        error: boolean;
    }>;
    estadoCaja(): Promise<{
        abierta: boolean;
        error: boolean;
    } | {
        error: boolean;
        mensaje: string;
    }>;
}
