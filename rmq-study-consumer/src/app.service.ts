import { Injectable, Logger, Scope } from '@nestjs/common';
import { Channel, connect, Connection } from 'amqplib';

@Injectable({})
export class AppService {
    constructor() {}
    private logger = new Logger(AppService.name);

    async getHello(data) {
        this.logger.debug(data);
        if (!data.name) {
            throw new Error('houve um erro');
        }
        return;
    }
}
