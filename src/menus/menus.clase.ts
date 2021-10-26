import * as schMenus from "./menus.mongodb";

export class MenusClase {
    private bloqueado: boolean;

    constructor() {
        this.bloqueado = false;
    }

    clickMenu(nombreMenu: string) {
        return schMenus.getTecladoMain(nombreMenu);
    }

    getBloqueado() {
        return this.bloqueado;
    }

    getMenus() {
        return schMenus.getMenus();
    }
    
    setBloqueado(x: boolean) {
        this.bloqueado = x;
    }
}

export const menusInstance = new MenusClase();