(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-93e284dc"],{"372c":function(t,e,c){},4461:function(t,e,c){"use strict";c.r(e);c("26e9"),c("fb6a"),c("b680");var n=c("7a23"),i=function(t){return Object(n["A"])("data-v-b7e1288e"),t=t(),Object(n["y"])(),t},l={class:"col"},o=i((function(){return Object(n["h"])("br",null,null,-1)})),a={class:"row"},b={class:"table-responsive"},s={class:"table"},u=i((function(){return Object(n["h"])("thead",null,[Object(n["h"])("tr",null,[Object(n["h"])("th",{scope:"col"},"Número ticket"),Object(n["h"])("th",{scope:"col"},"Hora"),Object(n["h"])("th",{scope:"col"},"Forma de pago"),Object(n["h"])("th",{scope:"col"},"Total")])],-1)})),r=["onClick"],j={style:{"text-align":"center"}},O={key:0,class:"col"},d={class:"row"},h={class:"col"},v=i((function(){return Object(n["h"])("i",{class:"bi bi-printer-fill iconosBootstrap"},null,-1)})),f=[v];function k(t,e,c,i,v,k){var p=Object(n["F"])("DetalleTicket");return Object(n["x"])(),Object(n["g"])(n["a"],null,[Object(n["h"])("div",l,[o,Object(n["h"])("div",a,[Object(n["h"])("div",b,[Object(n["h"])("table",s,[u,Object(n["h"])("tbody",null,[(Object(n["x"])(!0),Object(n["g"])(n["a"],null,Object(n["D"])(i.listaTickets.slice().reverse(),(function(t,e){return Object(n["x"])(),Object(n["g"])("tr",{key:{index:e},onClick:function(e){return i.setTicketActivo(t)},class:Object(n["r"])({estiloActivoTicketCaja:t._id===i.activo})},[Object(n["h"])("td",j,Object(n["I"])(t._id),1),Object(n["h"])("td",null,Object(n["I"])(i.moment.unix(t.timestamp/1e3).format("DD/MM/YYYY hh:mm:ss")),1),Object(n["h"])("td",null,Object(n["I"])(t.tipoPago),1),Object(n["h"])("td",null,Object(n["I"])(t.total.toFixed(2))+" €",1)],10,r)})),128))])])])])]),null!=i.ticketInfo?(Object(n["x"])(),Object(n["g"])("div",O,[Object(n["k"])(p,{ticket:i.ticketInfo},null,8,["ticket"]),Object(n["h"])("div",d,[Object(n["h"])("div",h,[Object(n["h"])("button",{onClick:e[0]||(e[0]=function(t){return i.imprimirTicket()}),type:"button",class:"btn btn-secondary botonesPrincipales w-100 btn-block botonesWidth"},f)])])])):Object(n["f"])("",!0)],64)}var p=c("3f20"),m=(c("47e6"),c("53ed"),c("bc3a")),g=c.n(m),T=c("c1df"),w=c.n(T),C=c("5502"),I=c("a18c"),x=(c("0180"),{name:"Caja",setup:function(){var t=Object(n["C"])(null),e=Object(n["C"])(0),c=Object(n["C"])([]),i=Object(n["C"])(null);Object(C["b"])();function l(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];n&&(e=c.value[c.value.length-1]),i.value=e,c.value.length>0&&(t.value=e._id)}function o(t){I["a"].push(t)}function a(){null!=t.value?(g.a.post("impresora/imprimirTicket",{idTicket:t.value}),o("/")):console.log("Primero selecciona un ticket")}return Object(n["v"])((function(){g.a.post("tickets/getTicketsIntervalo").then((function(t){e.value=0;for(var n=0;n<t.data.length;n+=1)e.value+=t.data[n].total;c.value=t.data,l("",!0)}))})),{goTo:o,listaTickets:c,setTicketActivo:l,activo:t,total:e,moment:w.a,ticketInfo:i,imprimirTicket:a}},components:{DetalleTicket:p["a"]}}),y=(c("e04f"),c("d959")),D=c.n(y);const _=D()(x,[["render",k],["__scopeId","data-v-b7e1288e"]]);e["default"]=_},e04f:function(t,e,c){"use strict";c("372c")}}]);
//# sourceMappingURL=chunk-93e284dc.3ea125ce.js.map