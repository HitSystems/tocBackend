export declare class CestasController {
    borrarCesta(params: any): Promise<{
        okey: boolean;
        cestaNueva: import("./cestas.interface").CestasInterface;
        error?: undefined;
    } | {
        okey: boolean;
        error: string;
        cestaNueva?: undefined;
    } | {
        okey: boolean;
        error: string;
    } | {
        okey: boolean;
        error: string;
    }>;
    borrarItemCesta(params: any): Promise<{
        okey: boolean;
        cestaNueva: boolean | import("./cestas.interface").CestasInterface;
    } | {
        okey: boolean;
        error: string;
    }>;
    borrarArticulosCesta(params: any): Promise<{
        okey: boolean;
        cestaNueva: boolean | import("./cestas.interface").CestasInterface;
    } | {
        okey: boolean;
        error: string;
    }>;
    getCesta(params: any): Promise<import("./cestas.interface").CestasInterface | {
        okey: boolean;
        error: string;
    }>;
    setUnidadesAplicar(params: any): {
        okey: boolean;
    };
    clickTeclaArticulo(params: any): Promise<{
        error: boolean;
        bloqueado: boolean;
        cesta: import("./cestas.interface").CestasInterface;
    } | {
        error: boolean;
        bloqueado: boolean;
    }>;
    crearCesta(params: any): Promise<{
        error: boolean;
        bloqueado: boolean;
        cesta: import("./cestas.interface").CestasInterface;
    } | {
        error: boolean;
        bloqueado: boolean;
    }>;
    getCestas(): Promise<{
        error: boolean;
        bloqueado: boolean;
        cestas: import("./cestas.interface").CestasInterface[];
    } | {
        error: boolean;
        bloqueado: boolean;
    }>;
}
