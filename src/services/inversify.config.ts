import { Container } from "inversify";
import "reflect-metadata";
import {Http} from './http/Http';
import {IHttp} from './http/IHttp';
import {IReddit} from './reddit/IReddit';
import {Reddit} from './reddit/Reddit';
import {TYPES} from './types';
import {IEmailer} from './email/IEmail';
import {Emailer} from './email/Email';
import {IDailyMailSpammer} from './daily-mail-spammer/IDailyMailSpammer';
import {DailyMailSpammer} from './daily-mail-spammer/DailyMailSpammer';
import { config } from '../config/Config';

const IOC = new Container();

// bind concrete classes to their interfaces
IOC.bind<IHttp>(TYPES.HTTP).to(Http);
IOC.bind<IReddit>(TYPES.REDDIT).to(Reddit);
IOC.bind<IEmailer>(TYPES.EMAILER).to(Emailer);
IOC.bind<IDailyMailSpammer>(TYPES.DAILY_MAIL_SPAMMER).to(DailyMailSpammer);

IOC.bind(TYPES.CONFIG).toDynamicValue((ctx) => {
    // When a service requires a "TYPES.CONFIG" injection, dynamically inject the correct part of the config for the requesting service
    // EG if the class requiring config is "TYPES.EMAIL", config.email will be injected

    // better way to get this??
    const {serviceIdentifier} = ctx.currentRequest.parentRequest;

    const serviceConfig = ({
        [TYPES.EMAILER]: config.email,
    })[serviceIdentifier as string];

    if (!serviceConfig) {
        throw new Error(`Configuration not found for service ${serviceIdentifier as string}`)
    }

    return serviceConfig;
});

export { IOC };
