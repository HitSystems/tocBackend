import { conexion } from "../conexion/mongodb";

export async function getPromociones(): Promise<any> {
    const database = (await conexion).db('tocgame');
    const promociones = database.collection('promociones');
    const resultado = await (await promociones.find()).toArray();
    
    return resultado;
}
