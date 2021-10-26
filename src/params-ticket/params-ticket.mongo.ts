import { conexion } from "../conexion/mongodb";

export async function insertarParametrosTicket(data: any) {
    const database = (await conexion).db('tocgame');
    const paramTickets = database.collection('parametros-ticket');
    const resultado = await paramTickets.insertMany(data);
    return resultado;
}

export async function getParamsTicket() {
    const database = (await conexion).db('tocgame');
    const paramTickets = database.collection('parametros-ticket');
    const arrayResult = await (await paramTickets.find({})).toArray();
    return arrayResult;
}
