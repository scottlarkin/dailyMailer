
Daily mail advertises "Cash for videos" (you've been framed style) so they can stick them on youtube for ad revenue.
(eg https://youtu.be/GkggTXY1hGE?t=81)

This will scrape the top posts from Reddit videos subreddit and send them all to Daily Mail in hopes of getting cash money

Requires nodeJs & npm

Running instructions:
- create a `secrets.json` file in `secrets` directory. This file must match the interface defined in `src/config/IConfig.ts` (example below)
- run `npm i`
- run `npm run start`

Warning - this will send 100 emails to the daily mail

Example `secrets.json`:
```$json
{
  "email": {
    "host": "smtp.gmail.com" (for example),
    "port": 465 (depends on the host),
    "secure": true (depends on the host/port),
    "auth": {
        "user": "<your smtp user>",
        "pass": "<your smtp password>"
    },
    "sender": {
        "name": "<your name>",
        "email": "<your email>"
    },
    "mailSpammer": {
        "subreddits": [
          "videos"
        ],
        "numPostsFromEachSubreddit": 100
    }
  }
}
```
