export declare class MenusClase {
    private bloqueado;
    constructor();
    clickMenu(nombreMenu: string): Promise<any>;
    getBloqueado(): boolean;
    getMenus(): Promise<any>;
    setBloqueado(x: boolean): void;
}
export declare const menusInstance: MenusClase;
