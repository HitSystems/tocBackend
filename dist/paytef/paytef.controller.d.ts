export declare class PaytefController {
    iniciarTransaccion(params: any): Promise<{
        error: boolean;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    }>;
    comprobarEstado(): Promise<{
        error: boolean;
        info: boolean;
    } | {
        error: boolean;
        mensaje: any;
    }>;
    resultadoFinal(params: any): Promise<{
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje?: undefined;
    }>;
}
