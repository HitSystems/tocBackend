import * as schClientes from './clientes.mongodb';
import { ClientesInterface } from './clientes.interface';

export class Clientes {
    /* Busca tanto nombres como tarjeta cliente */
    buscar(cadena: string) {
        return schClientes.buscar(cadena).then((res: ClientesInterface[]) => {
            if (res.length > 0) {
                return res;
            } else {
                return [];
            }
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }

    getClienteByID(idCliente: string): Promise<ClientesInterface> {
        return schClientes.getClieneteByID(idCliente).then((res: ClientesInterface) => {
            return res;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }

    insertarClientes(arrayClientes) {
        return schClientes.insertarClientes(arrayClientes).then((res) => {
            return res.acknowledged;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
}
export const clienteInstance = new Clientes();
