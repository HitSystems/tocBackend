"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dobleMenusInstance = exports.DobleMenusClase = void 0;
const schDobleMenus = __importStar(require("./doble-menus.mongodb"));
class DobleMenusClase {
    constructor() {
        this.bloqueado = false;
    }
    clickMenu(nombreMenu) {
    }
    getBloqueado() {
        return this.bloqueado;
    }
    getMenus() {
        return schDobleMenus.getMenus();
    }
    setBloqueado(x) {
        this.bloqueado = x;
    }
    insertarMenus(arrayMenus) {
        if (arrayMenus.length <= 0)
            return [];
        return schDobleMenus.insertarMenus(arrayMenus).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
exports.DobleMenusClase = DobleMenusClase;
exports.dobleMenusInstance = new DobleMenusClase();
//# sourceMappingURL=doble-menus.clase.js.map