import {IDailyMailSpammer} from './IDailyMailSpammer';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {IReddit} from '../reddit/IReddit';
import {IEmailer} from '../email/IEmail';

@injectable()
export class DailyMailSpammer implements IDailyMailSpammer {

    //TODO - move to config
    // What kind of video subreddits do daily mail readers like?
    private readonly subreddits = [
        'videos',
    ];

    // TODO - add more strings & use a random one in each email body & maybe put in config
    // TODO - look into ML AI generated strings, feed training data from daily mail article comments
    private readonly messages = [
        'Check out this video I found online!',
        'Send me cash please',
    ];

    constructor(
        @inject(TYPES.REDDIT) private readonly reddit: IReddit,
        @inject(TYPES.EMAILER) private readonly emailer: IEmailer,
    ) { }

    async spam() {
        const postsInAllSubs = await Promise.all(this.subreddits.map(sub => this.reddit.getTopPosts(sub, 100)));

        const allPosts = postsInAllSubs.reduce((a, c) => [...a, ...c], []);

        await Promise.all(allPosts.map(async (post) => {
            await this.emailer.sendEmail('videos@dailymail.com', post.title, post.url_overridden_by_dest);
            console.log('Email sent', post.title, post.url_overridden_by_dest);
        }));
    }
}
