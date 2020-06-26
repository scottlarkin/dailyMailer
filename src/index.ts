import {IOC} from './services/inversify.config';
import {TYPES} from './services/types';
import {IDailyMailSpammer} from './services/daily-mail-spammer/IDailyMailSpammer';

const dailyMailSpammer = IOC.get<IDailyMailSpammer>(TYPES.DAILY_MAIL_SPAMMER);

(async () => {
    // spam daily mails email inbox
    await dailyMailSpammer.spam();

    // TODO - add scheduling, automatically do this every x amount of time
    // TODO - add a mechanism to prevent sending the same email twice
    // TODO - webserver
    // TODO - FE to view emails sent, manage scheduling, amend email contents
    // TODO - add support for many email host/user configs
    // TODO - auto generate new email senders so above can be automated
    // TODO - receive cash for videos
})();
