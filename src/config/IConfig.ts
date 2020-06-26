
export default interface IConfig {
    email: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
        sender: {
            name: string;
            email: string;
        };
    };
    mailSpammer: {
        subreddits: string[],
        numPostsFromEachSubreddit: number;
    }
}
