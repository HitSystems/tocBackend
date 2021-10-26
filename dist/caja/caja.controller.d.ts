export declare class CajaController {
    cerrarCaja(params: any): Promise<{
        error: boolean;
    } | {
        error: boolean;
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
    }>;
}
