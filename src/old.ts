import * as dotenv from 'dotenv';
dotenv.config();

//import { default as generator, Entity, Response } from 'megalodon';
import { writeFile } from 'node:fs/promises';

//import { default as generator } from 'megalodon';
import generator, { Response, Entity, Mastodon } from "megalodon";


// @ts-ignore
const client:Mastodon = generator.default(
  'mastodon',
  process.env.BASE_URL,
  process.env.ACCESS_TOKEN
);

// https://github.com/h3poteto/megalodon#home-timeline
// show boosts
// show replies
client.getHomeTimeline({}) //max_id min_id since_id
.then((res: Response<Array<Entity.Status>>) => {
  console.log('getHomeTimeline');
  writeFile('home.json', JSON.stringify(res.data));
});

// conversations = direct messages


/* client.getAccountStatuses(
  'Safaa@mastodon.social',
  {
    only_media: false,
    //since_id: '109275296748243647',
    limit: 3,
})
.then((res:Response<Entity.Status[]>) => {
  console.log('getAccountStatuses');
  console.log(res.data);
}); */

// aka server
/* client.getInstance()
.then((res:Response<Entity.Instance>) => {
  console.log('instance');
  console.log(res.data);
}); */

//client.getAccount()
//client.getAccountFavourites
//client.getAccountFollowers
//client.getAccountFollowing

//client.getDomainBlocks
//client.blockDomain
//client.unblockDomain

/* client.getPreferences()
.then((res:Response<Entity.Preferences>) => {
  console.log('preferences');
  console.log(res.data);
}); */

/* client.getPublicTimeline({})
.then((res:Response<Entity.Status[]>) => {
  console.log('public timeline');
  console.log(res.data);
}); */

//client.search
//client.searchAccount
//client.

/* client.getConversationTimeline()
.then((res:Response<Entity.Conversation[]>) => {
  console.log('conversation timeline');
  console.log(res.data);
}); */

//client.reblogStatus()
//client.getFavourites
//client.getBookmarks
//client.getAccount
//client.getConversationTimeline
//client.getLists
//client.getInstance
//client.publicStream
//client.publicStream()
//client.getAccountLists
//client.getAccountStatuses

//client.getRelationships()

// https://github.com/h3poteto/megalodon#post-toot

// https://github.com/h3poteto/megalodon#post-medias

// https://github.com/h3poteto/megalodon#websocket-streaming

// https://github.com/h3poteto/megalodon#http-streaming

// https://github.com/h3poteto/megalodon#authorization

// https://github.com/h3poteto/megalodon#detect-each-sns
