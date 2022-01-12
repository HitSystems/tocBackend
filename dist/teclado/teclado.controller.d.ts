export declare class TecladoController {
    clickTecla(params: any): Promise<{
        error: boolean;
        bloqueado: boolean;
        suplementos: any;
        cesta?: undefined;
    } | {
        error: boolean;
        bloqueado: boolean;
        cesta: import("../cestas/cestas.interface").CestasInterface | {
            suplementos: boolean;
            data: any[];
        };
        suplementos?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    }>;
}
