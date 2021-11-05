interface TiposIva {
    base1: number;
    base2: number;
    base3: number;
    valorIva1: number;
    valorIva2: number;
    valorIva3: number;
    importe1: number;
    importe2: number;
    importe3: number;
}
export declare function construirObjetoIvas(infoArticulo: any, unidades: any, tipoIvaAnterior: TiposIva, infoAPeso?: any): TiposIva;
export declare function convertirPuntosEnDinero(puntos: number): number;
export declare function crearCestaVacia(): {
    _id: number;
    nombre: string;
    tiposIva: {
        base1: number;
        base2: number;
        base3: number;
        valorIva1: number;
        valorIva2: number;
        valorIva3: number;
        importe1: number;
        importe2: number;
        importe3: number;
    };
    lista: any[];
};
export {};
