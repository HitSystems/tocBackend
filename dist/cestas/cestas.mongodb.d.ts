import { CestasInterface } from "./cestas.interface";
export declare function getUnaCesta(): Promise<any>;
export declare function getCestaConcreta(idCesta: number): Promise<any>;
export declare function eliminarCesta(nombre: string): Promise<import("mongodb").DeleteResult>;
export declare function updateIdCestaTrabajador(id: string): Promise<import("mongodb").InsertOneResult<import("bson").Document>>;
export declare function getAllCestas(): Promise<any>;
export declare function borrarCesta(idCesta: number): Promise<import("mongodb").UpdateResult>;
export declare function setCesta(cesta: CestasInterface): Promise<import("bson").Document | import("mongodb").UpdateResult>;
