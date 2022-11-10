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

## REFERENCE

- https://nodejs.org/docs/latest-v18.x/api/test.html#test_running_tests_from_the_command_line
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

## TODO

- bug in URL wrapping limits (eating up whitespace?)
- wrap urls with its metadata? ~ https://github.com/jshemas/openGraphScraper
- support content warning https://masto.pt/@trombalazana/109316118487009405
- show polls? https://mastodon.gamedev.place/@djlink/109315216054813414
- fall back to languages other than english and portuguese? which criteria?
