a dedicated local mastodon client, using your browser or terminal


## Features

- shows your home timeline in a page of 4
- records reading position, ie, you will remove on the next page
- caches seen toots/statuses for the last 3 days and filters their boosts
- has simple text to speech feature. to skip to next toot press `N`
- ad hoc language detection of portuguese, falling back to english \*
- rewrites user and status URLs from instance/@person to ourInstance/@person@instance \*\*
- displays poll options
- displays content warnings (opened)

\* - many people fill the language field incorrectly  
\*\* - super useful. if you follow the link you'll be able to act on the user or toot directly without logging in


## to setup

login on your instance and add an application, ex: https://mastodon.social/settings/applications

create .env file like this (change your values):

```
BASE_URL=https://mastodon.social
ACCESS_TOKEN=REDACTED_ACCESS_TOKEN
```

```
npm install
```


## to run

```
npm run build
npm run run
```

visit http://127.0.0.1:3000

refresh to get another page :)

to use the terminal version of the app, edit `src/main.ts` import of `main` from `server` to `repl`, rebuild and rerun.

## REFERENCE

- https://nodejs.org/docs/latest-v18.x/api/test.html#test_running_tests_from_the_command_line
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions


## TODO

- add tests to check templates with CW and poll
- fill in batch with more statuses after filtering out some?
- wrap URLs with their metadata? - https://github.com/jshemas/openGraphScraper
- fall back to languages other than english and portuguese? which criteria?
