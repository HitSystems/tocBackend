import { ClientesInterface } from './clientes.interface';
export declare class Clientes {
    buscar(cadena: string): Promise<any[] | ClientesInterface[]>;
    getClienteByID(idCliente: string): Promise<ClientesInterface>;
    insertarClientes(arrayClientes: any): Promise<boolean>;
}
export declare const clienteInstance: Clientes;
