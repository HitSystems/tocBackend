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
}
