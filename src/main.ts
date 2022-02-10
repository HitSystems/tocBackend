import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';
require('./sincro');

<<<<<<< HEAD
axios.defaults.baseURL = (process.argv[2] === 'modoServer') ? ('http://63.35.219.5:3001') : ('http://63.35.219.5:3001'); // NORMAL
=======
axios.defaults.baseURL = (process.argv[2] === 'modoServer') ? ('http://localhost:3001') : ('http://34.78.247.153:3001'); // NORMAL
>>>>>>> parent of 47ce931 (SERVIDOR)
// axios.defaults.baseURL = (process.argv[2] === 'modoServer') ? ('http://localhost:3001') : ('http://localhost:3001'); // DEV LOCAL SANPEDRO

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: true,
    credentials: true
  }});
  // app.enableCors();
  await app.listen(3000);
}
bootstrap();
