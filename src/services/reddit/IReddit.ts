
export interface IPost {
    title: string;
    score: number;
    url_overridden_by_dest: string;
}

export interface IReddit {
    getTopPosts(subreddit: string, n: number): Promise<IPost[]>;
}
