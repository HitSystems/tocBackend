
const exec = require('child_process').exec;
export class Apagar {
     
     apagarEquipo() {
       exec("sudo -s shutdown now")
    }
   

   
   
}

 export const apagarinstance = new Apagar();

