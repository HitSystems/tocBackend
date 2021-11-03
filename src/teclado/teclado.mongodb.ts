import { conexion } from "../conexion/mongodb";

export async function insertarTeclas(arrayTeclas) {
    const database = (await conexion).db('tocgame');
    const teclas = database.collection('teclas');
    const resultado = await teclas.insertMany(arrayTeclas);
    
    return resultado;
}
