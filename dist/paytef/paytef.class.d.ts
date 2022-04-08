declare class PaytefClass {
    iniciarTransaccion(idCliente: string): Promise<boolean>;
    consultarEstadoOperacion(): Promise<void>;
    cerrarTicket(idTransaccion: string): Promise<{
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje?: undefined;
    }>;
}
declare const paytefInstance: PaytefClass;
export { paytefInstance };
