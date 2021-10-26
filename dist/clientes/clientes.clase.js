"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteInstance = exports.Clientes = void 0;
const schClientes = require("./clientes.mongodb");
class Clientes {
    buscar(cadena) {
        return schClientes.buscar(cadena).then((res) => {
            if (res.length > 0) {
                return res;
            }
            else {
                return [];
            }
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }
    getClienteByID(idCliente) {
        return schClientes.getClieneteByID(idCliente).then((res) => {
            return res;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }
}
exports.Clientes = Clientes;
exports.clienteInstance = new Clientes();
//# sourceMappingURL=clientes.clase.js.map