(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a0ca244"],{"37c0":function(t,e,a){"use strict";a.r(e);var n=a("7a23");function c(t,e,a,c,r,o){var i=Object(n["E"])("MenuTecnicoComponent");return Object(n["w"])(),Object(n["g"])("div",null,[Object(n["j"])(i)])}var r=function(t){return Object(n["z"])("data-v-10f91c9b"),t=t(),Object(n["x"])(),t},o={class:"container-fliud"},i={class:"row text-center mt-2"},s={class:"col"},l={class:"row text-center mt-2"},d={class:"col"},u={class:"row text-center mt-2"},b={class:"col"},m=r((function(){return Object(n["h"])("div",{class:"row text-center mt-2"},[Object(n["h"])("div",{class:"col"},[Object(n["h"])("button",{class:"btn btn-primary buttonSizeTecnico","data-bs-toggle":"modal","data-bs-target":"#modalConfigImpresora"},"Config. VID y PID impresora")])],-1)})),p={class:"row text-center mt-2"},f={class:"col"},j={class:"position-fixed bottom-0 start-0 ms-2 mb-2"},h={class:"modal fade",id:"modalConfigImpresora",tabindex:"-1","aria-hidden":"true"},O={class:"modal-dialog"},v={class:"modal-content"},g=r((function(){return Object(n["h"])("div",{class:"modal-header"},[Object(n["h"])("h5",{class:"modal-title",id:"exampleModalLabel"},"Configuración VID y PID impresora"),Object(n["h"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)})),C={class:"modal-body"},I={class:"input-group mb-3"},T=r((function(){return Object(n["h"])("span",{class:"input-group-text",id:"basic-addon1"},"VID",-1)})),k={class:"input-group mb-3"},x=r((function(){return Object(n["h"])("span",{class:"input-group-text",id:"basic-addon1"},"PID",-1)})),y={class:"modal-footer"},w=r((function(){return Object(n["h"])("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Cerrar",-1)}));function z(t,e,a,c,r,z){return Object(n["w"])(),Object(n["g"])(n["a"],null,[Object(n["h"])("div",o,[Object(n["h"])("div",i,[Object(n["h"])("div",s,[Object(n["h"])("button",{class:"btn btn-primary buttonSizeTecnico",onClick:e[0]||(e[0]=function(t){return c.descargarClientesFinales()})},"Descargar clientes finales")])]),Object(n["h"])("div",l,[Object(n["h"])("div",d,[Object(n["h"])("button",{class:"btn btn-primary buttonSizeTecnico",onClick:e[1]||(e[1]=function(t){return c.descargarTicketInfo()})},"Descargar info. ticket finales")])]),Object(n["h"])("div",u,[Object(n["h"])("div",b,[Object(n["h"])("button",{class:"btn btn-primary buttonSizeTecnico",onClick:e[2]||(e[2]=function(t){return c.actualizarTeclados()})},"Actualizar teclado")])]),m,Object(n["h"])("div",p,[Object(n["h"])("div",f,[Object(n["h"])("button",{class:"btn btn-primary buttonSizeTecnico",onClick:e[3]||(e[3]=function(t){return c.imprimirTest()})},"Imprimir test")])])]),Object(n["h"])("div",j,[Object(n["h"])("button",{class:"btn btn-warning buttonSizeTecnico",onClick:e[4]||(e[4]=function(t){return c.volver()})},"Volver")]),Object(n["h"])("div",h,[Object(n["h"])("div",O,[Object(n["h"])("div",v,[g,Object(n["h"])("div",C,[Object(n["h"])("div",I,[T,Object(n["Q"])(Object(n["h"])("input",{type:"text",class:"form-control",placeholder:"0x4B8","onUpdate:modelValue":e[5]||(e[5]=function(t){return c.vid=t})},null,512),[[n["M"],c.vid]])]),Object(n["h"])("div",k,[x,Object(n["Q"])(Object(n["h"])("input",{type:"text",class:"form-control",placeholder:"0x202","onUpdate:modelValue":e[6]||(e[6]=function(t){return c.pid=t})},null,512),[[n["M"],c.pid]])])]),Object(n["h"])("div",y,[w,Object(n["h"])("button",{type:"button",class:"btn btn-primary",onClick:e[7]||(e[7]=function(t){return c.guardarCambiosImpresora()})},"Guardar cambios")])])])])],64)}var D=a("bc3a"),A=a.n(D),V=a("a18c"),E=a("0180"),M=a("a1e9"),S=a("5c40"),P={setup:function(){var t=Object(E["b"])(),e=Object(M["l"])(""),a=Object(M["l"])("");function n(){A.a.post("clientes/descargarClientesFinales").then((function(e){0==e.data.error?t.success("Clientes descargados OK"):t.error(e.data.mensaje)}))["catch"]((function(e){console.log(e),t.error("Error descargarClientesFinales CATCH")}))}function c(){V["a"].push("/menu/caja")}function r(){A.a.post("teclado/actualizarTeclado").then((function(e){0==e.data.error?t.success("OK"):t.error(e.data.mensaje)}))["catch"]((function(e){console.log(e),t.error("Error catch")}))}function o(){A.a.post("test/imprimirAlgo")}function i(){A.a.post("parametros/vidAndPid",{vid:e.value,pid:a.value}).then((function(e){0==e.data.error?t.success("Cambios guardados"):t.error(e.data.mensaje)}))["catch"]((function(e){console.log(e),t.error("Error guardarCambiosImpresora CATCH")}))}function s(){A.a.post("params-ticket/descargarInfoTicket").then((function(e){0==e.data.error?t.success("Info. ticket actualizada"):t.error(e.data.mensaje)}))["catch"]((function(e){console.log(e),t.error("Error en Catch")}))}return Object(S["A"])((function(){A.a.get("parametros/getVidAndPid").then((function(n){0==n.data.error?(e.value=n.data.info.impresoraUsbInfo.vid,a.value=n.data.info.impresoraUsbInfo.pid):t.error(n.data.mensaje)}))["catch"]((function(e){console.log(e),t.error("Error get")}))})),{imprimirTest:o,guardarCambiosImpresora:i,vid:e,pid:a,descargarTicketInfo:s,volver:c,descargarClientesFinales:n,actualizarTeclados:r}}},F=(a("a2e0"),a("d959")),U=a.n(F);const H=U()(P,[["render",z],["__scopeId","data-v-10f91c9b"]]);var J=H,K={name:"MenuTecnico",components:{MenuTecnicoComponent:J}};const Q=U()(K,[["render",c]]);e["default"]=Q},a2e0:function(t,e,a){"use strict";a("f83a")},f83a:function(t,e,a){}}]);
//# sourceMappingURL=chunk-1a0ca244.4d8f3999.js.map