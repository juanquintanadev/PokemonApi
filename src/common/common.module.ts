import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    providers: [AxiosAdapter], // hay que definir el adaptador
    exports: [AxiosAdapter] // hay que exportar el adapter porque esta a nivel de modulos solamente, para que sea visible y acceseble
})
export class CommonModule {}
