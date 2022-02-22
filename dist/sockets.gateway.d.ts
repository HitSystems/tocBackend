export declare class SocketGateway {
    server: any;
    test(params: any): void;
    consultarPuntos(params: any): void;
    cobrarConClearone(params: any): Promise<void>;
    polling(params: any): Promise<boolean | void>;
}
export declare const socketInterno: SocketGateway;
