import * as schDobleMenus from "./doble-menus.mongodb";

export class DobleMenusClase {
    private bloqueado: boolean;

    constructor() {
        this.bloqueado = false;
    }

    clickMenu(nombreMenu: string) {
    }

    getBloqueado() {
        return this.bloqueado;
    }

    getMenus() {
        return schDobleMenus.getMenus();
    }
    
    setBloqueado(x: boolean) {
        this.bloqueado = x;
    }

    insertarMenus(arrayMenus) {
        return schDobleMenus.insertarMenus(arrayMenus).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}

export const dobleMenusInstance = new DobleMenusClase();