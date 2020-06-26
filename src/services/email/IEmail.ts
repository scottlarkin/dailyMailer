
export interface IEmailer {
    sendEmail(to: string, title: string, body: string): Promise<void>;
}
