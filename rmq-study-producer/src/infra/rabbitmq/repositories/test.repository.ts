import { Logger, OnModuleInit } from '@nestjs/common';
import { connect } from 'amqplib';

export class RmqRepository implements OnModuleInit {
    private conn;
    private channel;

    constructor() {}

    private logger = new Logger(RmqRepository.name);

    async onModuleInit() {
        this.conn = await connect(`amqp://guest:guest@localhost:5672`);
        this.channel = await this.conn.createChannel();
    }

    sendMessage({ routekey, pattern, data, headers }) {
        const content = JSON.stringify({
            pattern,
            data,
        });
        const isSend = this.channel.publish(
            'amq.direct',
            routekey,
            Buffer.from(content),
            {
                headers: headers,
            },
        );
        this.logger.debug(`send? ${isSend}`);
        return isSend;
    }
}
