export declare class PaytefController {
    iniciarTransaccion(params: any): Promise<boolean | {
        error: boolean;
        mensaje: string;
    }>;
    comprobarEstado(): Promise<{
        error: boolean;
        mensaje: string;
        continuo?: undefined;
    } | {
        error: boolean;
        continuo: boolean;
        mensaje?: undefined;
    } | {
        error: boolean;
        continuo: boolean;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
        continuo?: undefined;
    }>;
    cancelarOperacionActual(): Promise<boolean>;
    buscarDispositivos(): void;
}
