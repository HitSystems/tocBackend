import { conexion } from "../conexion/mongodb";

export async function buscar(busqueda: string): Promise<any> {
    const database = (await conexion).db('tocgame');
    const clientes = database.collection('clientes');
    const resultado = await clientes.find({$or:[{"nombre": { '$regex': new RegExp(busqueda, 'i')}}, {"tarjetaCliente": busqueda}]}, {limit: 20});
    const arrayResult = await resultado.toArray();
    return arrayResult;
}

export async function getClieneteByID(idCliente: string): Promise<any> {
    const database = (await conexion).db('tocgame');
    const clientes = database.collection('clientes');
    const resultado = await clientes.findOne({ id: idCliente });
    return resultado;
}
