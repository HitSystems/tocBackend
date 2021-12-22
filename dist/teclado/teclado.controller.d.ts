export declare class TecladoController {
    clickTecla(params: any): Promise<{
        error: boolean;
        bloqueado: boolean;
        cesta: import("../cestas/cestas.interface").CestasInterface;
    } | {
        error: boolean;
        mensaje: string;
    }>;
    actualizarArticulos(): Promise<{
        error: boolean;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje: string;
    } | {
        error: boolean;
        mensaje: string;
    }>;
}
