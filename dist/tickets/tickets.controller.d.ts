export declare class TicketsController {
    getTicketsIntervalo(params: any): Promise<any[]>;
    crearTicketEfectivo(params: any): Promise<{
        error: boolean;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje: string;
    }> | {
        error: boolean;
        mensaje: string;
    };
    crearTicketDatafono3G(params: any): Promise<{
        error: boolean;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje: string;
    }> | {
        error: boolean;
        mensaje: string;
    };
}
