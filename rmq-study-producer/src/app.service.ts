import { Injectable, Logger } from '@nestjs/common';
import { Information } from './information.dto';
import { dataInformation } from './data';

@Injectable()
export class AppService {
    private information: Information[] = [];

    private logger = new Logger(AppService.name);

    constructor() {}

    createInformation(data: Information): void {
        dataInformation.push(data);
        this.logger.debug(`${JSON.stringify(data)}`);
        this.logger.debug(JSON.stringify(dataInformation));
    }

    getAllInformation(): Information[] {
        this.logger.debug(dataInformation);
        return dataInformation;
    }
}
