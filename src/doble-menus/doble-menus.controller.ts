import { Controller, Post, Query, Body } from '@nestjs/common';
import { dobleMenusInstance } from './doble-menus.clase';

@Controller('doble-menus')
export class MenusController {
    @Post('clickMenu')
    clickMenu(@Body() params) {
    }

    @Post('getMenus')
    getMenus() {
        return dobleMenusInstance.getMenus().then((resultado) => {
            if(!dobleMenusInstance.getBloqueado()) {
                return {bloqueado: false, resultado: resultado};
            }
            else {
                return {bloqueado: true};
            }        
        });
    }
}
