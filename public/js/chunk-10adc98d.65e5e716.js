(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10adc98d"],{"8d2e":function(t,e,o){},"9a0b":function(t,e,o){"use strict";o.r(e);var a=o("7a23"),n=function(t){return Object(a["z"])("data-v-f01aeb7a"),t=t(),Object(a["x"])(),t},i={class:"row pt-1"},c={class:"col-md-1"},r={class:"d-flex flex-column align-items-stretch flex-shrink-0 bg-white",style:{width:"140px",height:"100%"}},s={class:"list-group list-group-flush border-bottom scrollarea"},u=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-cash iconosBootstrap me-3"})],-1)})),l=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-piggy-bank iconosBootstrap me-3"})],-1)})),d=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-door-open iconosBootstrap me-3"})],-1)})),b=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-trash iconosBootstrap me-3"})],-1)})),j=[b],p=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-globe iconosBootstrap me-3"})],-1)})),f=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-pencil-square iconosBootstrap me-3"})],-1)})),h=[f],g=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-key iconosBootstrap me-3"})],-1)})),m={class:"col"};function O(t,e,o,n,b,f){var O=Object(a["E"])("router-link"),v=Object(a["E"])("Trabajador"),T=Object(a["E"])("router-view");return Object(a["w"])(),Object(a["g"])("div",i,[Object(a["h"])("div",c,[Object(a["h"])("div",r,[Object(a["h"])("div",s,[Object(a["j"])(O,{to:"/",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(a["P"])((function(){return[u]})),_:1}),Object(a["j"])(O,{to:"/menu/caja",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(a["P"])((function(){return[l]})),_:1}),Object(a["j"])(O,{to:"/menu/fichajes",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(a["P"])((function(){return[d]})),_:1}),Object(a["h"])("button",{onClick:e[0]||(e[0]=function(t){return n.devoluciones()}),class:"list-group-item list-group-item-action py-3 lh-tight"},j),Object(a["j"])(O,{to:n.url,class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(a["P"])((function(){return[p]})),_:1},8,["to"]),Object(a["h"])("button",{onClick:e[1]||(e[1]=function(t){return n.imprimirEntregas()}),class:"list-group-item list-group-item-action py-3 lh-tight"},h),Object(a["j"])(O,{to:"/menuTecnico",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(a["P"])((function(){return[g]})),_:1}),Object(a["j"])(v)])])]),Object(a["h"])("div",m,[Object(a["j"])(T)])])}var v=o("5502"),T=o("bc3a"),y=o.n(T),w=o("a18c"),A=o("f06f"),k=["onClick"];function x(t,e,o,n,i,c){return Object(a["w"])(!0),Object(a["g"])(a["a"],null,Object(a["C"])(n.arrayTrabajadores,(function(t,e){return Object(a["w"])(),Object(a["g"])("div",{class:Object(a["q"])(["btn mb-3",[{"btn-info":n.esActivo(t.idTrabajador),"btn-outline-info":!n.esActivo(t.idTrabajador)}]]),key:e,onClick:function(e){return n.changeActivo(t.idTrabajador)}},Object(a["H"])(t.nombre),11,k)})),128)}o("0d03"),o("d3b7"),o("25f0");var E={name:"Trabajador",setup:function(){var t=Object(v["b"])(),e=Object(a["B"])(),o=Object(a["B"])([]);function n(t){return e.value===t}function i(e){y.a.post("trabajadores/setActivo",{id:e}).then((function(o){o.data.error?console.log("Error al cambiar trabajador activo"):(t.dispatch("Trabajadores/setTrabajadorActivo",e),t.dispatch("Cesta/setIdAction",e.toString()),c())}))}function c(){y.a.post("trabajadores/getTrabajadoresFichados").then((function(a){a.data.error?console.log("Error en getTrabajadoresFichados"):a.data.res.length>0&&(t.dispatch("Trabajadores/setArrayTrabajadores",a.data.res),o.value=a.data.res,y.a.post("trabajadores/getCurrentTrabajador").then((function(o){o.data.error?console.log("Error en getCurrentTrabajador"):(console.log(o.data),e.value=o.data.trabajador.idTrabajador,t.dispatch("Trabajadores/setTrabajadorActivo",o.data.trabajador.idTrabajador))}))["catch"]((function(t){console.log(t)})))}))["catch"]((function(t){console.log(t)}))}return Object(a["u"])((function(){c()})),{arrayTrabajadores:o,esActivo:n,changeActivo:i}}},B=o("d959"),C=o.n(B);const P=C()(E,[["render",x]]);var _=P,I={name:"Menu",props:{tipoToast:{required:!1},mensajeToast:{required:!1}},setup:function(t){var e=Object(v["b"])(),o=Object(a["c"])((function(){return e.state.Menu.hidden})),n=A["a"].getParametros();console.log(n);var i="/menu/pedidos/".concat(n.codigoTienda);function c(){e.dispatch("Ticket/setActivoAction",null)}function r(){e.dispatch("Menu/setHiddenAction",!0),c()}function s(){w["a"].push("/menu/pedidos/".concat(n.codigoTienda))}function u(t){w["a"].push(t)}function l(){e.dispatch("setModoActual","DEVOLUCION"),w["a"].push("/")}function d(){var t=n.codigoTienda;console.log("http://dsv.hiterp.com/TpvInforma.asp?Llic=00".concat(t,"&Versio=6001010&Tipus=EntregasPendientes")),y.a.get("http://dsv.hiterp.com/TpvInforma.asp?Llic=00".concat(t,"&Versio=6001010&Tipus=EntregasPendientes")).then((function(t){for(var e=t.data,o="",a=!1,n=0;n<e.length;n++)if(a||"]"===e[n-1]&&"a"===e[n-2]){if(a=!0,"]"===e[n])break;o+=e[n]}console.log(o)})),r(),c()}return void 0!=t.tipoToast&&void 0!=t.mensajeToast?(toast(t.mensajeToast,{type:t.tipoToast}),console.log("Deberían abrirse la ptm")):(console.log("No están definidos. INFO TOAST"),console.log(t.tipoToast,t.mensajeToast)),{pedidos:s,devoluciones:l,isHidden:o,hideMenu:r,quitarActivoTicket:c,imprimirEntregas:d,goTo:u,url:i}},components:{Trabajador:_}};o("b647");const q=C()(I,[["render",O],["__scopeId","data-v-f01aeb7a"]]);e["default"]=q},b647:function(t,e,o){"use strict";o("8d2e")}}]);
//# sourceMappingURL=chunk-10adc98d.65e5e716.js.map