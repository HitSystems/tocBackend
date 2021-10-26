import { Controller, Post, Query } from '@nestjs/common';
import { parametrosInstance } from "./parametros.clase";
@Controller('parametros')
export class ParametrosController {
    @Post('todoInstalado')
    todoInstalado() {
        const res = parametrosInstance.todoInstalado();
        if (res) {
            const respuestaParametros = parametrosInstance.getParametros();
            return {
                todoInstalado: true,
                config: respuestaParametros
            };
        } else {
            return { todoInstalado: false };
        }
    }

    @Post('getParametros')
    getParametros() {
        const parametros = parametrosInstance.getParametros();
        return { error: false, parametros };      
    }
}
