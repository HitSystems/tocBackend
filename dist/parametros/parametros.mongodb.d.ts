import { ParametrosInterface } from "./parametros.interface";
export declare function getParametros(): Promise<import("bson").Document>;
export declare function setParametros(params: ParametrosInterface): Promise<import("mongodb").UpdateResult>;
export declare function setUltimoTicket(idTicket: number): Promise<import("mongodb").UpdateResult>;
