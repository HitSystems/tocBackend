import { conexion } from "../conexion/mongodb";

export async function getInfoArticulo(idArticulo: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const articulos = database.collection('articulos');
    const resultado = await articulos.findOne({_id: idArticulo});
    
    return resultado;
}

export async function getInfoArticuloTarifaEspecial(idArticulo: number): Promise<any> {
    const database = (await conexion).db('tocgame');
    const articulos = database.collection('ArticulosTarifaEspecial');
    const resultado = await articulos.findOne({_id: idArticulo});
    
    return resultado;
}
