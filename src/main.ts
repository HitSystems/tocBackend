import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';
require('./sincro');

axios.defaults.baseURL = (process.argv[2] === 'modoServer') ? ('http://localhost:3001') : ('http://localhost:3001'); // NORMAL
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
