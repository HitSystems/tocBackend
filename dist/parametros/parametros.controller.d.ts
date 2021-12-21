export declare class ParametrosController {
    todoInstalado(): {
        todoInstalado: boolean;
        config: import("./parametros.interface").ParametrosInterface;
    } | {
        todoInstalado: boolean;
        config?: undefined;
    };
    getParametros(): {
        error: boolean;
        parametros: import("./parametros.interface").ParametrosInterface;
    };
    vidAndPid(params: any): Promise<{
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
    getVidAndPid(): Promise<{
        error: boolean;
        info: import("./parametros.interface").ParametrosInterface;
        mensaje?: undefined;
    } | {
        error: boolean;
        mensaje: string;
        info?: undefined;
    } | {
        error: boolean;
        mensaje: string;
    }>;
}
