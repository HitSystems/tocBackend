(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9a18c40c"],{"10c4":function(t,e,n){(function(e,n){t.exports=n()})(0,(function(){"use strict";function t(t){var e,n=1+(t.length+8>>6),r=[];for(e=0;e<16*n;e++)r[e]=0;for(e=0;e<t.length;e++)r[e>>2]|=t.charCodeAt(e)<<24-8*(3&e);return r[e>>2]|=128<<24-8*(3&e),r[16*n-1]=8*t.length,r}function e(t){var e,n="0123456789abcdef",r="";for(e=0;e<4*t.length;e++)r+=n.charAt(t[e>>2]>>8*(3-e%4)+4&15)+n.charAt(t[e>>2]>>8*(3-e%4)&15);return r}function n(t){var e,n,i,s,u,l,d,h,f=[],b=1732584193,p=4023233417,v=2562383102,y=271733878,m=3285377520;for(d=0;d<t.length;d+=16){for(e=b,n=p,i=v,s=y,u=m,h=0;h<80;h++)f[h]=h<16?t[d+h]:c(f[h-3]^f[h-8]^f[h-14]^f[h-16],1),l=o(o(c(b,5),r(h,p,v,y)),o(o(m,f[h]),a(h))),m=y,y=v,v=c(p,30),p=b,b=l;b=o(b,e),p=o(p,n),v=o(v,i),y=o(y,s),m=o(m,u)}return[b,p,v,y,m]}function r(t,e,n,r){return t<20?e&n|~e&r:t<40?e^n^r:t<60?e&n|e&r|n&r:e^n^r}function a(t){return t<20?1518500249:t<40?1859775393:t<60?2400959708:3395469782}function o(t,e){var n=(65535&t)+(65535&e),r=(t>>16)+(e>>16)+(n>>16);return r<<16|65535&n}function c(t,e){return t<<e|t>>>32-e}function i(r){return e(n(t(r)))}return i}))},"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("d3b7");function r(t,e,n,r,a,o,c){try{var i=t[o](c),s=i.value}catch(u){return void n(u)}i.done?e(s):Promise.resolve(s).then(r,a)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var c=t.apply(e,n);function i(t){r(c,a,o,i,s,"next",t)}function s(t){r(c,a,o,i,s,"throw",t)}i(void 0)}))}}},"2bad":function(t,e,n){"use strict";n("ce81")},"308b":function(t,e,n){"use strict";n.r(e);var r=n("7a23"),a=function(t){return Object(r["A"])("data-v-14a5fa56"),t=t(),Object(r["y"])(),t},o={class:"row"},c={class:"col-md-6 ms-3 mt-3"},i={class:"row ms-3"},s={class:"card cardWidth"},u={class:"card-body",style:{"text-align":"center"}},l=a((function(){return Object(r["h"])("span",null,[Object(r["h"])("i",{class:"bi bi-fingerprint"})],-1)})),d={class:"card cardWidth"},h={class:"card-body",style:{"text-align":"center"}},f=a((function(){return Object(r["h"])("span",null,[Object(r["h"])("i",{class:"bi bi-cup-straw"})],-1)})),b={class:"card cardWidth"},p={class:"card-body",style:{"text-align":"center"}},v=a((function(){return Object(r["h"])("span",null,[Object(r["h"])("i",{class:"bi bi-file-earmark-lock"})],-1)})),y={class:"modal fade",id:"modalFichajes","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1"},m={class:"modal-dialog",style:{"max-width":"700px"}},j={class:"modal-content"},g=a((function(){return Object(r["h"])("div",{class:"modal-header"},[Object(r["h"])("h5",{class:"modal-title",id:"exampleModalLabel"},"Fichaje"),Object(r["h"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)})),O={class:"modal-body"},w={class:"row"},x={class:"row mt-2"},C=a((function(){return Object(r["h"])("option",{value:"SIN_TURNO"},"Sin turno",-1)})),L=["value"],k={class:"row mt-2"},E={class:"table",style:{height:"400px"}},P={class:"table table-striped"},T=a((function(){return Object(r["h"])("thead",null,[Object(r["h"])("tr",null,[Object(r["h"])("th",{scope:"col"},"Nombre"),Object(r["h"])("th",{scope:"col"},"Fichar/Desfichar")])],-1)})),_={key:0},N=["onClick"],A={key:1},I=["onClick"],R={class:"modal-footer"},S={class:"modal fade",id:"modalPassword",tabindex:"-1"},F={class:"modal-dialog",style:{"max-width":"700px"}},M={class:"modal-content"},U=a((function(){return Object(r["h"])("div",{class:"modal-header"},[Object(r["h"])("h5",{class:"modal-title",id:"exampleModalLabel"},"Ingresa la contraseña"),Object(r["h"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1)})),B={class:"modal-body"},G={class:"row"},z={class:"col"},q={class:"mb-3"},D=a((function(){return Object(r["h"])("label",{class:"form-label"},"Contraseña",-1)})),V=a((function(){return Object(r["h"])("div",{class:"modal-footer"},[Object(r["h"])("button",{type:"button",class:"btn btn-danger","data-bs-dismiss":"modal"},"Cerrar"),Object(r["h"])("button",{type:"submit",class:"btn btn-success","data-bs-dismiss":"modal"},"Confirmar")],-1)}));function W(t,e,n,a,W,H){return Object(r["x"])(),Object(r["g"])(r["a"],null,[Object(r["h"])("div",o,[Object(r["h"])("div",c,[Object(r["h"])("div",i,[Object(r["h"])("div",s,[Object(r["h"])("div",u,[l,Object(r["h"])("a",{href:"#",class:"btn btn-primary",onClick:e[0]||(e[0]=function(t){return a.abrirModal()})},"Fichaje")])]),Object(r["h"])("div",d,[Object(r["h"])("div",h,[f,Object(r["h"])("button",{onClick:e[1]||(e[1]=function(t){return a.consumoPersonal()}),class:"btn btn-primary"},"Consumo personal")])]),Object(r["h"])("div",b,[Object(r["h"])("div",p,[v,Object(r["h"])("button",{onClick:e[2]||(e[2]=function(t){return a.abrirModalPassword()}),class:"btn btn-primary"},"Menú responsable")])])])])]),Object(r["h"])("div",y,[Object(r["h"])("div",m,[Object(r["h"])("div",j,[g,Object(r["h"])("div",O,[Object(r["h"])("div",w,[Object(r["R"])(Object(r["h"])("input",{"onUpdate:modelValue":e[3]||(e[3]=function(t){return a.inputBusqueda=t}),class:"form-control",style:{width:"350px",height:"50px","font-size":"20px"},type:"text",placeholder:"Introduce tu nombre"},null,512),[[r["N"],a.inputBusqueda]]),Object(r["h"])("button",{type:"button",style:{width:"100px"},class:"btn btn-primary ms-2",onClick:e[4]||(e[4]=function(t){return a.buscar()})},"Buscar"),Object(r["h"])("button",{type:"button",style:{width:"200px"},class:"btn btn-warning ms-2",onClick:e[5]||(e[5]=function(t){return a.actualizarLista()})},"Actualizar lista"),Object(r["h"])("div",x,[Object(r["R"])(Object(r["h"])("select",{"onUpdate:modelValue":e[6]||(e[6]=function(t){return a.idPlanificacion=t}),class:"form-select",style:{height:"50px","font-size":"20px"}},[C,(Object(r["x"])(!0),Object(r["g"])(r["a"],null,Object(r["D"])(a.arrayPlanes,(function(t,e){return Object(r["x"])(),Object(r["g"])("option",{key:e,value:a.arrayPlanes[e].idPlan},Object(r["I"])(a.arrayPlanes[e].turno),9,L)})),128))],512),[[r["M"],a.idPlanificacion]])]),Object(r["h"])("div",k,[Object(r["h"])("div",E,[Object(r["h"])("table",P,[T,Object(r["h"])("tbody",null,[(Object(r["x"])(!0),Object(r["g"])(r["a"],null,Object(r["D"])(a.arrayTrabajadores,(function(t,e){return Object(r["x"])(),Object(r["g"])("tr",{key:e},[Object(r["h"])("td",null,Object(r["I"])(t.nombre),1),!1===t.fichado||void 0==t.fichado?(Object(r["x"])(),Object(r["g"])("td",_,[Object(r["h"])("a",{href:"#",style:{width:"150px"},class:"btn btn-outline-primary btn_fc",onClick:function(n){return a.fichar(t,e)}},"FICHAR",8,N)])):(Object(r["x"])(),Object(r["g"])("td",A,[Object(r["h"])("a",{href:"#",style:{width:"150px"},class:"btn btn-outline-success btn_fc",onClick:function(n){return a.desfichar(t,e)}},"DESFICHAR",8,I)]))])})),128))])])])])])]),Object(r["h"])("div",R,[Object(r["h"])("button",{type:"button",class:"btn btn-danger btn-lg","data-bs-dismiss":"modal",onClick:e[7]||(e[7]=function(t){return a.goTo("/")})},"Confirmar")])])])]),Object(r["h"])("div",S,[Object(r["h"])("div",F,[Object(r["h"])("div",M,[Object(r["h"])("form",{onSubmit:e[9]||(e[9]=Object(r["S"])((function(t){return a.goToMenuResponsable()}),["prevent"]))},[U,Object(r["h"])("div",B,[Object(r["h"])("div",G,[Object(r["h"])("div",z,[Object(r["h"])("div",q,[D,Object(r["R"])(Object(r["h"])("input",{type:"password",minlength:"3",maxlength:"20",class:"form-control","onUpdate:modelValue":e[8]||(e[8]=function(t){return a.password=t})},null,512),[[r["N"],a.password]])])])])]),V],32)])])])],64)}var H=n("1da1"),J=(n("96cf"),n("7b17")),Y=n("bc3a"),K=n.n(Y),Q=n("5502"),X=n("a18c"),Z=n("0180"),$=n("10c4"),tt={name:"Dependientas",setup:function(){var t=Object(Q["b"])(),e=Object(r["C"])("SIN_TURNO"),n="Santy",a=156,o=null,c=null,i=Object(r["C"])([]),s=Object(r["C"])(""),u=Object(Z["b"])(),l=Object(r["C"])([]),d=Object(r["C"])("");function h(){console.log("El selected es: ",e.value)}function f(){return b.apply(this,arguments)}function b(){return b=Object(H["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,$(d.value);case 2:e=t.sent,"4cd914fef37199909adb4c0ba5e31439429995c4"==e?X["a"].push("/menuResponsable"):u.error("Contraseña incorrecta");case 4:case"end":return t.stop()}}),t)}))),b.apply(this,arguments)}function p(){j().then((function(){o.show()}))["catch"]((function(t){console.log(t),o.show()}))}function v(){c.show()}function y(){o.hide()}function m(){K.a.post("trabajadores/buscar",{busqueda:s.value}).then((function(t){i.value=t.data}))["catch"]((function(t){console.log(t)}))}function j(){return K.a.get("turnos/getPlanes").then((function(t){0==t.data.error?l.value=t.data.info:u.error(t.data.mensaje)}))["catch"]((function(t){console.log(t),u.error("Error frontend catch: axios turnos/getPlanes")}))}function g(n,r){K.a.post("trabajadores/fichar",{idTrabajador:n.idTrabajador,idPlan:e.value}).then((function(a){a.data.error?(console.log(a.data.mensaje),i.value[r].fichado=!1):(t.dispatch("Cesta/setIdAction",n.idTrabajador),i.value[r].fichado=!0,j(),e.value="SIN_TURNO")}))["catch"]((function(t){console.log(t)}))}function O(t,n){"SIN_TURNO"==e.value?confirm("No has seleccionado turno. ¿CONTINUAR?")&&g(t,n):g(t,n)}function w(){K.a.post("trabajadores/actualizarTrabajadores").then((function(t){0==t.data.error?u.success("Trabajadores actualizados"):u.error(t.data.mensaje)}))}function x(e,n){K.a.post("trabajadores/desfichar",{idTrabajador:e.idTrabajador}).then((function(r){r.data.error?console.log("Error al desfichar"):(i.value[n].fichado=!1,t.dispatch("CestasActivas/deleteCestaActivaAction",e.idTrabajador),K.a.post("cestas/getCestaDiferente",{id_cesta:e.idTrabajador}).then((function(e){t.dispatch("Cesta/setIdAction",e.data._id),K.a.post("trabajadores/setActivo",{id:e.data._id}).then((function(t){t.data.error&&u.error(t.data.mensaje)}))})))}))["catch"]((function(t){console.log(t)}))}function C(){t.dispatch("setModoActual","CONSUMO PERSONAL"),t.dispatch("Footer/setMenuActivo",1),X["a"].push("/")}function L(t){X["a"].push(t)}return Object(r["v"])((function(){o=new J["a"](document.getElementById("modalFichajes"),{keyboard:!1}),c=new J["a"](document.getElementById("modalPassword"),{keyboard:!1}),K.a.get("turnos/getPlanes").then((function(t){0==t.data.error?l.value=t.data.info:u.error(t.data.mensaje)}))["catch"]((function(t){console.log(t),u.error("Error frontend catch: axios turnos/getPlanes")}))})),{goTo:L,goToMenuResponsable:f,abrirModalPassword:v,password:d,test:h,arrayPlanes:l,idPlanificacion:e,actualizarLista:w,consumoPersonal:C,fichar:O,desfichar:x,inputBusqueda:s,arrayTrabajadores:i,buscar:m,cerrarModal:y,abrirModal:p,nombre:n,id:a}},watch:{inputBusqueda:function(){this.inputBusqueda.length>=3&&this.buscar()}}},et=(n("2bad"),n("d959")),nt=n.n(et);const rt=nt()(tt,[["render",W],["__scopeId","data-v-14a5fa56"]]);e["default"]=rt},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",i=a.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(A){s=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var a=e&&e.prototype instanceof v?e:v,o=Object.create(a.prototype),c=new T(r||[]);return o._invoke=L(t,n,c),o}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(A){return{type:"throw",arg:A}}}t.wrap=u;var d="suspendedStart",h="suspendedYield",f="executing",b="completed",p={};function v(){}function y(){}function m(){}var j={};s(j,o,(function(){return this}));var g=Object.getPrototypeOf,O=g&&g(g(_([])));O&&O!==n&&r.call(O,o)&&(j=O);var w=m.prototype=v.prototype=Object.create(j);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function C(t,e){function n(a,o,c,i){var s=l(t[a],t,o);if("throw"!==s.type){var u=s.arg,d=u.value;return d&&"object"===typeof d&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,c,i)}),(function(t){n("throw",t,c,i)})):e.resolve(d).then((function(t){u.value=t,c(u)}),(function(t){return n("throw",t,c,i)}))}i(s.arg)}var a;function o(t,r){function o(){return new e((function(e,a){n(t,r,e,a)}))}return a=a?a.then(o,o):o()}this._invoke=o}function L(t,e,n){var r=d;return function(a,o){if(r===f)throw new Error("Generator is already running");if(r===b){if("throw"===a)throw o;return N()}n.method=a,n.arg=o;while(1){var c=n.delegate;if(c){var i=k(c,n);if(i){if(i===p)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=b,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var s=l(t,e,n);if("normal"===s.type){if(r=n.done?b:h,s.arg===p)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=b,n.method="throw",n.arg=s.arg)}}}function k(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,k(t,n),"throw"===n.method))return p;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var a=l(r,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,p;var o=a.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,p):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,p)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function _(t){if(t){var n=t[o];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,c=function n(){while(++a<t.length)if(r.call(t,a))return n.value=t[a],n.done=!1,n;return n.value=e,n.done=!0,n};return c.next=c}}return{next:N}}function N(){return{value:e,done:!0}}return y.prototype=m,s(w,"constructor",m),s(m,"constructor",y),y.displayName=s(m,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,s(t,i,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},x(C.prototype),s(C.prototype,c,(function(){return this})),t.AsyncIterator=C,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var c=new C(u(e,n,r,a),o);return t.isGeneratorFunction(n)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},x(w),s(w,i,"Generator"),s(w,o,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=_,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(P),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function a(r,a){return i.type="throw",i.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var c=this.tryEntries[o],i=c.completion;if("root"===c.tryLoc)return a("end");if(c.tryLoc<=this.prev){var s=r.call(c,"catchLoc"),u=r.call(c,"finallyLoc");if(s&&u){if(this.prev<c.catchLoc)return a(c.catchLoc,!0);if(this.prev<c.finallyLoc)return a(c.finallyLoc)}else if(s){if(this.prev<c.catchLoc)return a(c.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return a(c.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),P(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;P(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:_(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=r}catch(a){"object"===typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}},ce81:function(t,e,n){}}]);
//# sourceMappingURL=chunk-9a18c40c.e2b1198f.js.map