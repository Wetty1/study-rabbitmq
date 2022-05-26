import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExceptionService } from './exception.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, ExceptionService],
})
export class AppModule {}
