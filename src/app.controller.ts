import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('labwio')
  getLab() {
    return {
      mensaje: 'Laboratorio 3 funcionando',
      ambiente: process.env.AMBIENTE,
      apiKey: process.env.API_KEY
    };
  }
}
