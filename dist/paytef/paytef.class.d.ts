declare class PaytefClass {
    iniciarTransaccion(cantidad: number, idTicket: number, idCesta: number): Promise<boolean>;
    checkPagado(resPaytef: any, idClienteFinal: string): Promise<{
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje?: undefined;
    }>;
}
declare const paytefInstance: PaytefClass;
export { paytefInstance };
