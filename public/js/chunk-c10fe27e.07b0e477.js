(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c10fe27e"],{"6e07":function(t,e,n){},"9a0b":function(t,e,n){"use strict";n.r(e);var i=n("7a23"),c=function(t){return Object(i["A"])("data-v-9dd338f6"),t=t(),Object(i["y"])(),t},s={class:"row pt-1"},o={class:"col-md-1"},a={class:"d-flex flex-column align-items-stretch flex-shrink-0 bg-white",style:{width:"140px"}},r={class:"list-group list-group-flush border-bottom scrollarea"},u=c((function(){return Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Vender")],-1)})),l=c((function(){return Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Caja")],-1)})),d=c((function(){return Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Pedidos")],-1)})),b=[d],f=c((function(){return Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Trabajador/a")],-1)})),p=c((function(){return Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Devoluciones")],-1)})),h=[p],g=c((function(){return Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Entregas")],-1)})),j=[g],m=c((function(){return Object(i["h"])("div",{class:"d-flex w-100 align-items-center justify-content-between"},[Object(i["h"])("strong",{class:"mb-1"},"Técnico")],-1)})),O={class:"col"};function v(t,e,n,c,d,p){var g=Object(i["F"])("router-link"),v=Object(i["F"])("router-view");return Object(i["x"])(),Object(i["g"])("div",s,[Object(i["h"])("div",o,[Object(i["h"])("div",a,[Object(i["h"])("div",r,[Object(i["k"])(g,{to:"/",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(i["Q"])((function(){return[u]})),_:1}),Object(i["k"])(g,{to:"/menu/caja",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(i["Q"])((function(){return[l]})),_:1}),Object(i["h"])("button",{onClick:e[0]||(e[0]=function(t){return c.pedidos()}),class:"list-group-item list-group-item-action py-3 lh-tight"},b),Object(i["k"])(g,{to:"/menu/fichajes",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(i["Q"])((function(){return[f]})),_:1}),Object(i["h"])("button",{onClick:e[1]||(e[1]=function(t){return c.devoluciones()}),class:"list-group-item list-group-item-action py-3 lh-tight"},h),Object(i["h"])("button",{onClick:e[2]||(e[2]=function(t){return c.imprimirEntregas()}),class:"list-group-item list-group-item-action py-3 lh-tight"},j),Object(i["k"])(g,{to:"/menuTecnico",class:"list-group-item list-group-item-action py-3 lh-tight"},{default:Object(i["Q"])((function(){return[m]})),_:1})])])]),Object(i["h"])("div",O,[Object(i["k"])(v)])])}var w=n("5502"),T=n("bc3a"),y=n.n(T),k=n("a18c"),x=n("f06f"),A={name:"Menu",props:{tipoToast:{required:!1},mensajeToast:{required:!1}},setup:function(t){var e=Object(w["b"])(),n=Object(i["c"])((function(){return e.state.Menu.hidden})),c=x["a"].getParametros();function s(){e.dispatch("Ticket/setActivoAction",null)}function o(){e.dispatch("Menu/setHiddenAction",!0),s()}function a(){k["a"].push("/menu/pedidos/".concat(c.codigoTienda))}function r(t){k["a"].push(t)}function u(){e.dispatch("setModoActual","DEVOLUCION"),k["a"].push("/")}function l(){var t=842;y.a.get("http://dsv.hiterp.com/TpvInforma.asp?Llic=00".concat(t,"&Versio=6001010&Tipus=EntregasPendientes")).then((function(t){for(var e=t.data,n="",i=!1,c=0;c<e.length;c++)if(i||"]"===e[c-1]&&"a"===e[c-2]){if(i=!0,"]"===e[c])break;n+=e[c]}console.log(n)})),o(),s()}return void 0!=t.tipoToast&&void 0!=t.mensajeToast?(toast(t.mensajeToast,{type:t.tipoToast}),console.log("Deberían abrirse la ptm")):(console.log("No están definidos. INFO TOAST"),console.log(t.tipoToast,t.mensajeToast)),{pedidos:a,devoluciones:u,isHidden:n,hideMenu:o,quitarActivoTicket:s,imprimirEntregas:l,goTo:r}}},_=(n("d0bb"),n("d959")),C=n.n(_);const E=C()(A,[["render",v],["__scopeId","data-v-9dd338f6"]]);e["default"]=E},d0bb:function(t,e,n){"use strict";n("6e07")}}]);
//# sourceMappingURL=chunk-c10fe27e.07b0e477.js.map