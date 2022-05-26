import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const rmqOptions = {
    transport: Transport.RMQ,
    options: {
        urls: [`amqp://guest:guest@localhost:5672`],
        noAck: false,
        queue: 'test-queue',
        queueOptions: {
            durable: true,
        },
    },
};

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, rmqOptions);
    app.listen(() => {
        Logger.debug('RMQ started');
    });
    // const server = new RabbitmqServer('amqp://guest:guest@localhost:5672');
    // await server.start();
    // await server.consume('rmq-study-consumer', async message => {
    //     console.log(message.content.toString());
    //     const obj = JSON.parse(message.content.toString());
    //     if (obj['id'] == 2) {
    //         await server.publishInQueue('error-queue', JSON.stringify(obj));
    //     }
    // });
}
bootstrap();
