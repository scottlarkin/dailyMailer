import {IReddit, IPost} from './IReddit';
import {injectable, inject} from 'inversify';
import {IHttp} from '../http/IHttp';
import {TYPES} from '../types';

interface ReditListResponse<T> {
    kind: string;
    data: {
        modHash: string;
        dist: number;
        children: Array<{
            data: T;
            kind: number;
        }>;
    }
}

@injectable()
export class Reddit implements IReddit {

    private readonly baseUrl = 'https://www.reddit.com';

    constructor(
        @inject(TYPES.HTTP) private readonly http: IHttp,
    ) { }

    async getTopPosts(subreddit: string, n: number): Promise<IPost[]> {
        return (await this.http.get<ReditListResponse<IPost>>(
            `${this.baseUrl}/r/${subreddit}/top/.json?limit=${n}`
        )).data.children.map((item) => item.data);
    }
}
