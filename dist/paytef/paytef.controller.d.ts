export declare class PaytefController {
    iniciarTransaccion(params: any): Promise<{
        error: boolean;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    }>;
    comprobarEstado(): void;
}
