import { CestasInterface } from "./cestas.interface";
export declare function getUnaCesta(): Promise<any>;
export declare function getCestaConcreta(idCesta: number): Promise<any>;
export declare function getAllCestas(): Promise<any>;
export declare function borrarCesta(idCesta: number): Promise<import("mongodb").DeleteResult>;
export declare function setCesta(cesta: CestasInterface): Promise<import("bson").Document | import("mongodb").UpdateResult>;
