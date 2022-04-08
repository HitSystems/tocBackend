export declare class SocketGateway {
    server: any;
    test(params: any): void;
    consultarPuntos(params: any): void;
    cobrarConClearone(params: any): Promise<void>;
    polling(params: any): Promise<{
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
}
export declare const socketInterno: SocketGateway;
