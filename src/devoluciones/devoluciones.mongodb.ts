import { conexion } from "../conexion/mongodb";

export async function insertarDevolucion(data: any) {
    const database = (await conexion).db('tocgame');
    const devoluciones = database.collection('devoluciones');
    const resultado = await devoluciones.insertOne(data);
    return resultado;
}
