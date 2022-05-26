import {
    Controller,
    Get,
    Logger,
    OnModuleInit,
    Post,
    Request,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Channel, connect, Connection } from 'amqplib';
import { AppService } from './app.service';
import { ExceptionService } from './exception.service';
import RabbitmqServer from './rabbitmq-server';

@Controller()
export class AppController implements OnModuleInit {
    private connection: Connection;
    private channel: Channel;
    constructor(
        private readonly appService: AppService,
        private readonly exceptionService: ExceptionService,
    ) {}
    private logger = new Logger(AppController.name);
    async onModuleInit() {
        this.connection = await connect(`amqp://guest:guest@localhost:5672`);
        this.channel = await this.connection.createChannel();
    }
    @EventPattern('code')
    async test(@Payload() payload: any, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        try {
            await this.appService.getHello(payload);
            channel.ack(originalMsg);
            console.log('apagar');
        } catch (error) {
            this.exceptionService.sendMessageException(payload, context, error);
        }
    }
}
