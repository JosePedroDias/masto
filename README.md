simplest mastodon client ever, using megalodon


## setup

login on your instance and add an application, ex: https://mastodon.social/settings/applications

create .env file like this (change your values):

```
BASE_URL=https://mastodon.social
ACCESS_TOKEN=REDACTED_ACCESS_TOKEN
```

```
npm install
```

## run

```
npm run build
npm run run
```


## TODO

- rewrite isTextInPt
- read image descriptions
- all links as As on tootHTML
- space bar to skip reading a toot
- allow detecting en/pt OR overriding toot language
