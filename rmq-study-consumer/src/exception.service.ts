import { Logger } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

export class ExceptionService {
    constructor(private readonly rmqRepository) {}

    private logger = new Logger(ExceptionService.name);

    sendMessageException(payload: any, context: RmqContext, error: Error) {
        this.logger.error(error);

        const originalMsg = context.getMessage();
        const content = {
            data: {
                error: error.message,
                content: {
                    pattern: context.getPattern(),
                    data: payload,
                },
            },
        };

        this.logger.error(content);

        const headers = {
            ...originalMsg.properties.headers,
            routeKeyOrigin: originalMsg.fields.routingKey,
        };

        const contentBuffer = Buffer.from(JSON.stringify(content));

        context
            .getChannelRef()
            .publish('amq.direct', 'exception', contentBuffer, {
                headers,
            });
        context.getChannelRef().ack(originalMsg);
    }
}
