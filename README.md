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

## Features

- stores last seen toot/status
- shows your home timeline in a page of 4
- dumb TTS feature that detects portuguese content and falls back to english (probably I can disable it and use the toot/status language, though I noticed lots of people tend to forget to fill it). read can be skipped with key `N`
- rewrites user and status URLs from instance/@person to ourInstance/@person@instance
- displays poll options
- displays content warnings (opened)

## TODO

- add tests to check templates with CW and poll
- fill in batch with more statuses after filtering out some?
- wrap URLs with their metadata? ~ https://github.com/jshemas/openGraphScraper
- fall back to languages other than english and portuguese? which criteria?
