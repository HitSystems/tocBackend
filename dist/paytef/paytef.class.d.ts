declare class PaytefClass {
    iniciarTransaccion(cantidad: number, idTicket: number, idCesta: number): Promise<boolean>;
}
declare const paytefInstance: PaytefClass;
export { paytefInstance };
