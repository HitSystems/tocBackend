export declare class MenusController {
    clickMenu(params: any): void;
    getMenus(): Promise<{
        bloqueado: boolean;
        resultado: any;
    } | {
        bloqueado: boolean;
        resultado?: undefined;
    }>;
}
