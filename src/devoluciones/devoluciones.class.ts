import { cestas } from "../cestas/cestas.clase";
import { trabajadoresInstance } from "../trabajadores/trabajadores.clase";
import { DevolucionesInterface } from "./devoluciones.interface";
import * as schDevoluciones from "./devoluciones.mongodb";

export class Devoluciones {
    async nuevaDevolucion(total: number, idCesta: number): Promise<boolean> {
        const infoTrabajador = await trabajadoresInstance.getCurrentTrabajador();
        const nuevoIdTicket = Date.now();
        const cesta = await cestas.getCesta(idCesta);

        if (cesta == null || cesta.lista.length == 0) {
            console.log("Error, la cesta es null o está vacía");
            return false;
        }
        const objDevolucion: DevolucionesInterface = {
            _id: nuevoIdTicket,
            timestamp: Date.now(),
            total: total,
            lista: cesta.lista,
            tipoPago: "DEVOLUCION",
            idTrabajador: infoTrabajador._id,
            tiposIva: cesta.tiposIva,
        }
        return await this.insertarDevolucion(objDevolucion);
    }

    private insertarDevolucion(data: DevolucionesInterface): Promise<boolean> {
        return schDevoluciones.insertarDevolucion(data).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
export const devolucionesInstance = new Devoluciones();
