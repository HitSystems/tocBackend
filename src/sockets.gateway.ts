import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { trabajadoresInstance } from "./trabajadores/trabajadores.clase";
import { cestas } from './cestas/cestas.clase';
import { TicketsInterface } from "./tickets/tickets.interface";
import { ticketsInstance } from "./tickets/tickets.clase";
import { movimientosInstance } from "./movimientos/movimientos.clase";
import { parametrosInstance } from "./parametros/parametros.clase";
const net = require('net');

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
    transports: ['websocket', 'polling'],
    },
    allowEIO3: true
  })
export class SocketGateway{
  @WebSocketServer()
  server;

    // @SubscribeMessage('test')
    // test() {
    //   this.server.emit('test', 'O Rei Eze');
    // }

//   @SubscribeMessage('enviarAlDatafono')
//   async cobrarConClearone(@MessageBody() params) {
//       let total: number = params.total;
//       let idCesta: number = params.idCesta;

//         const infoTrabajador = await trabajadoresInstance.getCurrentTrabajador();
//         const nuevoIdTicket = (await ticketsInstance.getUltimoTicket()) + 1;
//         const cesta = await cestas.getCesta(idCesta);
//         console.log("La cesta es", cesta, idCesta);
//         if (cesta == null || cesta.lista.length == 0) {
//             console.log("Error, la cesta es null o está vacía");
//             this.server.emit('resDatafono', {
//               error: true,
//               mensaje: 'Error, la cesta es null o está vacía',
//             });
//         }

//         const info: TicketsInterface = {
//             _id: nuevoIdTicket,
//             timestamp: Date.now(),
//             total: total,
//             lista: cesta.lista,
//             tipoPago: "TARJETA",
//             idTrabajador: infoTrabajador._id,
//             tiposIva: cesta.tiposIva,
//             cliente: null, // DE MOMENTO NULL PARA TODOS LOS CLIENTES
//             infoClienteVip: {
//                 esVip : false,
//                 nif: '',
//                 nombre: '',
//                 cp: '',
//                 direccion: '',
//                 ciudad: ''
//             }
//         }

//         const client = new net.Socket();
//         const aux = this;
//         client.connect(8890, '127.0.0.1', function () {
//             var ventaCliente = 547; // info.clearOneCliente;
//             var nombreDependienta = '';
//             var numeroTicket = info._id;
//             var tienda = 73; //info.clearOneTienda;
//             var tpv = 1;// info.clearOneTpv;
//             var tipoOperacion = 1; //1=> VENTA
//             var importe = info.total; //EN CENTIMOS DE EURO
//             var venta_t = `\x02${ventaCliente};${tienda};${tpv};ezequiel;${numeroTicket};${tipoOperacion};${importe};;;;;;;\x03`;
//             console.log('cliente: ', ventaCliente, ' tienda: ', tienda, ' tpv: ', tpv, ' tipoOperacion: ', tipoOperacion, ' numeroTicket: ', numeroTicket, ' nombreDependienta: ', nombreDependienta, ' importe: ', importe);
//             client.write(venta_t);
//         });

//         client.on('error', function(err){
//             console.log(err);
//             aux.server.emit('resDatafono', {
//               error: true,
//               mensaje: 'Error, mirar log en backend'
//             });
//             // event.sender.send('desactivar-espera-datafono');
//             // event.sender.send('nuevo-toast', {tipo: 'error', mensaje: 'Datáfono no configurado'});
//         });

//         client.on('data', async function (data: any) {
//             var objEnviar = {
//                 data: data,
//                 objTicket: info,
//                 idCesta: idCesta
//             };
//             console.log('Recibido: ' + data);
            
//             // vueCobrar.desactivoEsperaDatafono();
//             let respuestaTexto = "";
//             for(let i = 0; i < objEnviar.data.length; i++) {
//                 respuestaTexto += String.fromCharCode(objEnviar.data[i])
//             }
//             // ipcRenderer.send("insertarError", {error: respuestaTexto, numeroTicket:  respuesta.objTicket._id, arrayBytes: respuesta.data})

//             //Primero STX, segundo estado transacción: correcta = 48, incorrecta != 48
//             if(respuestaTexto.includes("DENEGADA") == false && respuestaTexto.includes("denegada") == false && respuestaTexto.includes("ERROR") == false && respuestaTexto.includes("error") == false && objEnviar.data[0] == 2 && objEnviar.data[1] == 48 && objEnviar.data[2] == 59) { //SERÁ ACEPTADA
//                 movimientosInstance.nuevaSalida(objEnviar.objTicket.total, 'Targeta', 'TARJETA', true, objEnviar.objTicket._id);
//                 if (await ticketsInstance.insertarTicket(objEnviar.objTicket)) {
//                     if (await cestas.borrarCesta(objEnviar.idCesta)) {
//                         if (await parametrosInstance.setUltimoTicket(objEnviar.objTicket._id)) {
//                             aux.server.emit('resDatafono', {
//                               error: false,
//                             });
//                         } else {
//                             console.log("Error no se ha podido cambiar el último id ticket");
//                         }
//                     } else {
//                         console.log("Error, no se ha podido borrar la cesta");
//                     }
//                 } else {
//                     console.log("Error, no se ha podido insertar el ticket");
//                 }
                
//             } else { //SERÁ DENEGADA
//                 console.log("Data clearOne: ", objEnviar.data)
//             }
//             client.write('\x02ACK\x03');
//             client.destroy();
//         });
//         client.on('close', function () {
//             console.log('Conexión cerrada');
//             client.destroy();
//         });
//     }
}

export const ese = new SocketGateway();
