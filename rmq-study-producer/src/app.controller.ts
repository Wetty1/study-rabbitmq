import { Body, Controller, Get, Logger, Post, Request } from '@nestjs/common';
import {} from '@nestjs/microservices';
import { AppService } from './app.service';
import { connect } from 'amqplib';
import { Information } from './information.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    private logger = new Logger(AppController.name);

    @Post('test')
    async test(@Body() data) {
        try {
            const content = JSON.stringify({
                pattern: 'code',
                data,
            });
            const conn = await connect(`amqp://guest:guest@localhost:5672`);
            const channel = await conn.createChannel();
            const isSend = channel.publish(
                'amq.direct',
                'test-queue',
                Buffer.from(content),
            );
            this.logger.debug(`send? ${isSend}`);
            return isSend;
        } catch (error) {
            this.logger.error(error);
        }
    }

    // @GrpcMethod('RabbitmqService', 'CreateQueue')
    // async createInformation(information: Information) {
    //     this.appService.createInformation(information);
    //     return information;
    // }

    // @GrpcMethod('RabbitmqService', 'GetAllCreated')
    // async getAllInformations() {
    //     const allInformations = this.appService.getAllInformation();
    //     this.logger.debug(JSON.stringify(allInformations));
    //     return {
    //         insformations: allInformations,
    //     };
    // }

    // @EventPattern('teste-mensage')
    // async createInformationByQueue(
    //     @Payload() payload: Information,
    //     @Ctx() context: RmqContext,
    // ) {
    //     this.logger.debug(payload);
    //     const channel = context.getChannelRef();
    //     const originalMsg = context.getMessage();
    //     try {
    //         const information: Information = JSON.parse(
    //             context.getMessage().content.toString(),
    //         ) as Information;
    //         this.logger.debug(
    //             `${JSON.stringify(information)} ${typeof information}`,
    //         );
    //         this.appService.createInformation(information);
    //         await channel.ack(originalMsg);
    //     } catch (error) {
    //         this.logger.error(error);
    //     }
    // }
}
