(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-415b5b7f"],{"02d9":function(t,e,o){"use strict";o("4845")},"3f05":function(t,e,o){"use strict";o("f7b0")},4845:function(t,e,o){},"9a0b":function(t,e,o){"use strict";o.r(e);var a=o("7a23"),n=function(t){return Object(a["A"])("data-v-f727d892"),t=t(),Object(a["y"])(),t},c={class:"row pt-1"},i={class:"col-md-1"},r={class:"d-flex flex-column align-items-stretch flex-shrink-0 bg-white",style:{width:"140px",height:"100%"}},s={class:"list-group list-group-flush border-bottom scrollarea"},u=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-cash iconosBootstrap me-3"})],-1)})),l=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-piggy-bank iconosBootstrap me-3"})],-1)})),d=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-door-open iconosBootstrap me-3"})],-1)})),b=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-trash iconosBootstrap me-3"})],-1)})),j=[b],f=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-globe iconosBootstrap me-3"})],-1)})),p=[f],h=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-pencil-square iconosBootstrap me-3"})],-1)})),g=[h],m=n((function(){return Object(a["h"])("div",{class:"d-flex w-100 align-items-center justify-content-center"},[Object(a["h"])("i",{class:"bi bi-key iconosBootstrap me-3"})],-1)})),O={class:"col"};function v(t,e,o,n,b,f){var h=Object(a["F"])("router-link"),v=Object(a["F"])("Trabajador"),T=Object(a["F"])("router-view");return Object(a["x"])(),Object(a["g"])("div",c,[Object(a["h"])("div",i,[Object(a["h"])("div",r,[Object(a["h"])("div",s,[Object(a["k"])(h,{to:"/",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(a["Q"])((function(){return[u]})),_:1}),Object(a["k"])(h,{to:"/menu/caja/tickets",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(a["Q"])((function(){return[l]})),_:1}),Object(a["k"])(h,{to:"/menu/fichajes",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(a["Q"])((function(){return[d]})),_:1}),Object(a["h"])("button",{onClick:e[0]||(e[0]=function(t){return n.devoluciones()}),class:"list-group-item list-group-item-action py-3 lh-tight"},j),Object(a["h"])("button",{onClick:e[1]||(e[1]=function(t){return n.menuPedidos()}),class:"list-group-item list-group-item-action py-3 lh-tight"},p),Object(a["h"])("button",{onClick:e[2]||(e[2]=function(t){return n.imprimirEntregas()}),class:"list-group-item list-group-item-action py-3 lh-tight"},g),Object(a["k"])(h,{to:"/menuTecnico",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(a["Q"])((function(){return[m]})),_:1}),Object(a["k"])(v)])])]),Object(a["h"])("div",O,[Object(a["k"])(T)])])}var T=o("5502"),y=o("bc3a"),k=o.n(y),w=o("a18c"),A=o("f06f"),x={class:"mt-2 alturaTrabajador"},C=["onClick"];function B(t,e,o,n,c,i){return Object(a["x"])(),Object(a["g"])("div",x,[(Object(a["x"])(!0),Object(a["g"])(a["a"],null,Object(a["D"])(n.arrayTrabajadores,(function(t,e){return Object(a["x"])(),Object(a["g"])("div",{class:Object(a["r"])(["btn mb-3",[{"btn-color":n.esActivo(t.idTrabajador),"btn-outline-color":!n.esActivo(t.idTrabajador)}]]),key:e,onClick:function(e){return n.changeActivo(t.idTrabajador)}},Object(a["I"])(t.nombre),11,C)})),128))])}o("0d03"),o("d3b7"),o("25f0");var E={name:"Trabajador",setup:function(){var t=Object(T["b"])(),e=Object(a["C"])(),o=Object(a["C"])([]);function n(t){return e.value===t}function c(e){k.a.post("trabajadores/setActivo",{id:e}).then((function(o){o.data.error?console.log("Error al cambiar trabajador activo"):(t.dispatch("Trabajadores/setTrabajadorActivo",e),t.dispatch("Cesta/setIdAction",e.toString()),i(),w["a"].push("/"))}))}function i(){k.a.post("trabajadores/getTrabajadoresFichados").then((function(a){a.data.error?console.log("Error en getTrabajadoresFichados"):a.data.res.length>0&&(t.dispatch("Trabajadores/setArrayTrabajadores",a.data.res),o.value=a.data.res,k.a.post("trabajadores/getCurrentTrabajador").then((function(o){o.data.error?console.log("Error en getCurrentTrabajador"):(console.log(o.data),e.value=o.data.trabajador.idTrabajador,t.dispatch("Trabajadores/setTrabajadorActivo",o.data.trabajador.idTrabajador))}))["catch"]((function(t){console.log(t)})))}))["catch"]((function(t){console.log(t)}))}return Object(a["v"])((function(){i()})),{arrayTrabajadores:o,esActivo:n,changeActivo:c}}},_=(o("3f05"),o("d959")),F=o.n(_);const I=F()(E,[["render",B],["__scopeId","data-v-2bd2b4ce"]]);var M=I,P={name:"Menu",props:{tipoToast:{required:!1},mensajeToast:{required:!1}},setup:function(t){var e=Object(T["b"])(),o=Object(a["c"])((function(){return e.state.Menu.hidden})),n=A["a"].getParametros(),c=Object(a["C"])("");function i(){e.dispatch("Ticket/setActivoAction",null)}function r(){e.dispatch("Menu/setHiddenAction",!0),i()}function s(){w["a"].push("/menu/pedidos/".concat(n.codigoTienda))}function u(t){w["a"].push(t)}function l(){u(c.value),console.log(c.value)}function d(){e.dispatch("setModoActual","DEVOLUCION"),w["a"].push("/")}function b(){k.a.post("impresora/imprimirEntregas"),r(),i()}return k.a.get("parametros/getParametrosBonito").then((function(t){0==t.data.error?c.value="/menu/pedidos/".concat(t.data.parametros.codigoTienda):console.log("Error en parametros/getParametrosBonito")})),console.log(n),void 0!=t.tipoToast&&void 0!=t.mensajeToast?(toast(t.mensajeToast,{type:t.tipoToast}),console.log("Deberían abrirse la ptm")):(console.log("No están definidos. INFO TOAST"),console.log(t.tipoToast,t.mensajeToast)),{menuPedidos:l,pedidos:s,devoluciones:d,isHidden:o,hideMenu:r,quitarActivoTicket:i,imprimirEntregas:b,goTo:u,url:c}},components:{Trabajador:M}};o("02d9");const q=F()(P,[["render",v],["__scopeId","data-v-f727d892"]]);e["default"]=q},f7b0:function(t,e,o){}}]);
//# sourceMappingURL=chunk-415b5b7f.4ccc1463.js.map