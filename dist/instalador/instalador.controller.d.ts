export declare class InstaladorController {
    instalador(params: any): Promise<{
        error: boolean;
        info: any;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: any;
        info?: undefined;
    } | {
        error?: undefined;
        info?: undefined;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    }>;
}
