import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { trabajadoresInstance } from "./trabajadores/trabajadores.clase";
import { cestas } from './cestas/cestas.clase';
import { TicketsInterface } from "./tickets/tickets.interface";
import { ticketsInstance } from "./tickets/tickets.clase";
import { movimientosInstance } from "./movimientos/movimientos.clase";
import { parametrosInstance } from "./parametros/parametros.clase";
import { Body } from "@nestjs/common";
import axios from "axios";
const net = require('net');
const fs = require("fs");
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

  @SubscribeMessage('test')
  test() {
    this.server.emit('test', 'O Rei Eze');
  }

  @SubscribeMessage('consultarPuntos')
  consultarPuntos(@MessageBody() params) {
    if (params != undefined) {
      if (params.idClienteFinal != undefined) {
        this.server.emit('resConsultaPuntos', { error: false, info: 69 });
      } else {
        this.server.emit('resConsultaPuntos', { error: true, mensaje: 'Backend: Faltan datos en socket > consultarPuntos' });
      }
    } else {
      this.server.emit('resConsultaPuntos', { error: true, mensaje: 'Backend: Faltan datos en socket > consultarPuntos' });
    }
  }

  @SubscribeMessage('enviarAlDatafono')
  async cobrarConClearone(@MessageBody() params) {
    if (params != undefined) {
      if (params.total != undefined && params.idCesta != undefined) {
        let total: number = params.total;
        let idCesta: number = params.idCesta;
        const idClienteFinal: string = (params.idClienteFinal != undefined) ? (params.idClienteFinal) : ('');
        const infoTrabajador = await trabajadoresInstance.getCurrentTrabajador();
        const nuevoIdTicket = (await ticketsInstance.getUltimoTicket()) + 1;
        const cesta = await cestas.getCesta(idCesta);
  
        /* Comprobación cesta correcta */
        if (cesta == null || cesta.lista.length == 0) {
          console.log("Error, la cesta es null o está vacía");
          this.server.emit('resDatafono', {
            error: true,
            mensaje: 'Error, la cesta es null o está vacía',
          });
        }
  
        /* Creo datos del ticket */
        const info: TicketsInterface = {
            _id: nuevoIdTicket,
            timestamp: Date.now(),
            total: total,
            lista: cesta.lista,
            tipoPago: "TARJETA",
            idTrabajador: infoTrabajador._id,
            tiposIva: cesta.tiposIva,
            cliente: idClienteFinal,
            infoClienteVip: {
                esVip : false,
                nif: '',
                nombre: '',
                cp: '',
                direccion: '',
                ciudad: ''
            },
            enviado: false,
            enTransito: false,
            intentos: 0,
            comentario: '',
            regalo: (cesta.regalo == true && idClienteFinal != '' && idClienteFinal != null) ? (true): (false)
        }
        
        /* Abro socket para ClearONE */
        const client = new net.Socket();
        const aux = this;
  
        /* Get parámetros desde fichero ClearONE */
        let ventaCliente: number = null;
        let tienda: number = null;
        let tpv: number = null;
        let file = null;
        let arr = [];
  
        try {
          file = fs.readFileSync("/home/hit/clearOne/CoLinux.cfg", "utf8");
          arr = file.split(/\r?\n/);
        } catch(err) {
          console.log("Error: No se ha podido leer el archivo CoLinux");
        }
        
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].includes('[CLIENTE]')) {
            ventaCliente = Number(arr[i+1]);
          } else if (arr[i].includes('[TIENDA]')) {
            tienda = Number(arr[i+1]);
          } else if (arr[i].includes('[TPV]')) {
            tpv = Number(arr[i+1]);
          }
        }
  
        client.connect(8890, '127.0.0.1', function () {
          const nombreDependienta = '';
          const numeroTicket = info._id;
          const tipoOperacion = 1; //1=> VENTA
          const importe = Number((info.total * 100).toFixed(2)).toString(); //EN CENTIMOS DE EURO
          const venta_t = `\x02${ventaCliente};${tienda};${tpv};ezequiel;${numeroTicket};${tipoOperacion};${importe};;;;;;;\x03`;
          client.write(venta_t);
        });
  
        client.on('error', function(err) {
          console.log(err);
          aux.server.emit('resDatafono', {
            error: true,
            mensaje: 'Error, mirar log en backend'
          });
          // event.sender.send('desactivar-espera-datafono');
          // event.sender.send('nuevo-toast', {tipo: 'error', mensaje: 'Datáfono no configurado'});
        });
  
        client.on('data', async function (data: any) {
          const objEnviar = {
              data: data,
              objTicket: info,
              idCesta: idCesta
          };
          
          // vueCobrar.desactivoEsperaDatafono();
          let respuestaTexto = "";
  
          for(let i = 0; i < objEnviar.data.length; i++) {
              respuestaTexto += String.fromCharCode(objEnviar.data[i])
          }
          // ipcRenderer.send("insertarError", {error: respuestaTexto, numeroTicket:  respuesta.objTicket._id, arrayBytes: respuesta.data})
  
          //Primero STX, segundo estado transacción: correcta = 48, incorrecta != 48
          if(respuestaTexto.includes("DENEGADA") == false && respuestaTexto.includes("denegada") == false && respuestaTexto.includes("ERROR") == false && respuestaTexto.includes("error") == false && objEnviar.data[0] == 2 && objEnviar.data[1] == 48 && objEnviar.data[2] == 59) { //SERÁ ACEPTADA
              movimientosInstance.nuevaSalida(objEnviar.objTicket.total, 'Targeta', 'TARJETA', false, objEnviar.objTicket._id);
              if (await ticketsInstance.insertarTicket(objEnviar.objTicket)) {
                  if (await cestas.borrarCesta(objEnviar.idCesta)) {
                      if (await parametrosInstance.setUltimoTicket(objEnviar.objTicket._id)) {
                          aux.server.emit('resDatafono', {
                            error: false,
                          });
                      } else {
                        aux.server.emit('resDatafono', {
                          error: true,
                          mensaje: 'Error no se ha podido cambiar el último id ticket'
                        });
                      }
                  } else {
                    aux.server.emit('resDatafono', {
                      error: true,
                      mensaje: 'Error, no se ha podido borrar la cesta'
                    });
                  }
              } else {
                aux.server.emit('resDatafono', {
                  error: true,
                  mensaje: 'Error, no se ha podido insertar el ticket'
                });
              }            
          } else { //SERÁ DENEGADA
            console.log("Denegada: ", objEnviar.data);
            aux.server.emit('resDatafono', {
              error: true,
              mensaje: 'Error, operación DENEGADA'
            });
          }
          client.write('\x02ACK\x03');
          client.destroy();
        });
  
        client.on('close', function () {
          console.log('Conexión cerrada');
          client.destroy();
        });
      } else {
        this.server.emit('resDatafono', {
          error: true,
          mensaje: 'Faltan datos en gateway enviarAlDatafono'
        });
      }
    } else {
      this.server.emit('resDatafono', {
        error: true,
        mensaje: 'Faltan TODOS los datos en gateway enviarAlDatafono'
      });
    }
  }
  @SubscribeMessage('polling')
  async polling(@MessageBody() params) {
    if (params != null || params != undefined) {
      if (params.idClienteFinal != null || params.idClienteFinal != undefined) {
        return axios.post('http://10.129.118.29:8887/transaction/poll', {
          pinpad: "*"
        }).then(async (res: any) => {
          if (res.data.result == undefined || res.data.result == null) {
            this.polling({ idClienteFinal: params.idClienteFinal });
          } else {
            // console.log("Aprobado: ", res.data.result.approved);
            // console.log("Fallido: ", res.data.result.failed);
    
            if (res.data.result.approved && !res.data.result.failed) {
              const infoTransaccion = res.data.result.transactionReference.split('@');
              let total: number = Number(res.data.result.amountWithSign.replace(",", "."));
              console.log("amountWithSign: ", Number(res.data.result.amountWithSign));
              let idCesta: number = Number(infoTransaccion[1]);
              const idClienteFinal: string = (params.idClienteFinal != undefined) ? (params.idClienteFinal) : ('');
              const infoTrabajador = await trabajadoresInstance.getCurrentTrabajador();
              const nuevoIdTicket = (await ticketsInstance.getUltimoTicket()) + 1;
              const cesta = await cestas.getCesta(idCesta);
              console.log("infoTransaccion: ", infoTransaccion);
              console.log("idCesta: ", idCesta);
              /* Comprobación cesta correcta */
              if (cesta == null || cesta.lista.length == 0) {
                console.log("Error, la cesta es null o está vacía");
                this.server.emit('resDatafono', {
                  error: true,
                  mensaje: 'Error, la cesta es null o está vacía',
                });
              }
        
              /* Creo datos del ticket */
              const info: TicketsInterface = {
                  _id: nuevoIdTicket,
                  timestamp: Date.now(),
                  total: total,
                  lista: cesta.lista,
                  tipoPago: "TARJETA",
                  idTrabajador: infoTrabajador._id,
                  tiposIva: cesta.tiposIva,
                  cliente: idClienteFinal,
                  infoClienteVip: {
                      esVip : false,
                      nif: '',
                      nombre: '',
                      cp: '',
                      direccion: '',
                      ciudad: ''
                  },
                  enviado: false,
                  enTransito: false,
                  intentos: 0,
                  comentario: '',
                  regalo: (cesta.regalo == true && idClienteFinal != '' && idClienteFinal != null) ? (true): (false)
              }

              movimientosInstance.nuevaSalida(total, 'Targeta', 'TARJETA', false, nuevoIdTicket);
              if (await ticketsInstance.insertarTicket(info)) {
                  if (await cestas.borrarCesta(idCesta)) {
                      if (await parametrosInstance.setUltimoTicket(info._id)) {
                          this.server.emit('resDatafono', {
                            error: false,
                          });
                      } else {
                        this.server.emit('resDatafono', {
                          error: true,
                          mensaje: 'Error no se ha podido cambiar el último id ticket'
                        });
                      }
                  } else {
                    this.server.emit('resDatafono', {
                      error: true,
                      mensaje: 'Error, no se ha podido borrar la cesta'
                    });
                  }
              }
              this.server.emit('resPaytef', {
                error: false
              });
            } else {
              this.server.emit('resPaytef', {
                error: true,
                mensaje: "Operación denegada o cancelada"
              });
            }
          }
        }).catch((err) => {
          console.log(err);
          return false;
        });
      } else {
        this.server.emit('resPaytef', { error: true, mensaje: 'Backend socket: Faltan datos' });
      }
    } else {
      this.server.emit('resPaytef', { error: true, mensaje: 'Backend socket: Faltan todos los datos' });
    }
  }
}

export const socketInterno = new SocketGateway();
