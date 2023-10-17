import { Telegraf } from 'telegraf';
import {
  addVolunteerResponse,
  blockUserResponse,
  removeVolunteerResponse,
  startResponse,
} from './botResponses.js';
import 'dotenv/config';
import {
  connectUser,
  disconnectUser,
  isAdmin,
  isBlocked,
  isConnected,
  isRegistered,
  isVolunteer,
} from './firebase.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

// Start bot
bot.start(async (ctx) => {
  await connectUser(ctx.from.id);
  const msg = await startResponse({
    id: ctx.from.id,
    name: ctx.from.first_name,
    username: ctx.from.username,
  });
  ctx.reply(msg);
});

bot.command('stop', async (ctx) => {
  const userIsBlocked = await isBlocked(ctx.from.id);
  if (userIsBlocked) {
    ctx.reply('oops, something went wrong...');
  } else {
    await disconnectUser(ctx.from.id);
    ctx.reply('disconnected: Have a good day! /start to interact with the bot again.');
  }
});

// bot.command('test', (ctx) => {
//   ctx.reply(JSON.stringify(ctx.from));
// });

// Admin commands
bot.command('addVolunteer', async (ctx) => {
  const userIsAdmin = isAdmin(ctx.from.id);
  if (!userIsAdmin) {
    ctx.reply('oops, something went wrong...');
  } else {
    const args = ctx.update.message.text.split(' ');
    if (args.length === 1) {
      ctx.reply(`no user id found. use /addVolunteer [userId]`);
      return;
    }
    const msg = await addVolunteerResponse(ctx.from.id, args[1]);
    ctx.reply(msg);
  }
});

bot.command('removeVolunteer', async (ctx) => {
  const isUserAdmin = isAdmin(ctx.from.id);
  if (!isUserAdmin) {
    ctx.reply('oops, something went wrong...');
  } else {
    const args = ctx.update.message.text.split(' ');
    if (args.length === 1) {
      ctx.reply(`no user id found. use /removeVolunteer [userId]`);
      return;
    }
    const msg = await removeVolunteerResponse(ctx.from.id, args[1]);
    ctx.reply(msg);
  }
});

bot.command('blockUser', async (ctx) => {
  const isUserAdmin = isAdmin(ctx.from.id);
  if (!isUserAdmin) {
    ctx.reply('oops, something went wrong...');
  } else {
    const args = ctx.update.message.text.split(' ');
    if (args.length === 1) {
      ctx.reply(`no user id found. use /blockUser [userId]`);
      return;
    }
    const msg = await blockUserResponse(ctx.from.id, args[1]);
    // ctx.sendMessage(msg, { chat_id: id })
    ctx.reply(msg);
  }
});

bot.command('unblockUser', async (ctx) => {
  const isUserAdmin = isAdmin(ctx.from.id);
  if (!isUserAdmin) {
    ctx.reply('oops, something went wrong...');
  } else {
    const args = ctx.update.message.text.split(' ');
    if (args.length === 1) {
      ctx.reply(`no user id found. use /unblockUser [userId]`);
      return;
    }
    const msg = await blockUserResponse(ctx.from.id, args[1]);
    ctx.reply(msg);
  }
});

bot.command('fetchReportedUser', async (ctx) => {
  const adminId = ctx.from.id;
  // Implement logic to fetch reported users
  // You can use `ctx.reply` to communicate with the admin
  await ctx.reply('Fetching reported users...');
});

// all user commands
// Database will store isRegistered to keep track
bot.command('register', async (ctx) => {
  // TODO: need to find a way to prevent abuse of this command
  const userIsRegistered = await isRegistered(ctx.from.id);
  const userIsBlocked = await isBlocked(ctx.from.id);
  if (userIsRegistered && !userIsBlocked) {
    ctx.sendMessage('a request has already been sent to or approved by admin');
  } else if (userIsBlocked) {
    // prevent blocked user from using
    ctx.sendMessage('oops, something went wrong...');
  } else {
    ctx.sendMessage(
      `userId: ${ctx.from.id}, name: ${ctx.from.first_name}, username: ${ctx.from.username}, requested to be added as volunteer. /addVolunteer [userId] to add volunteer`,
      {
        chat_id: 222442132, // TODO: admin id, make it send to all admins
      }
    );
    ctx.reply('a request has been sent to admin');
  }
});

// Volunteer commands
bot.command('reportUser', async (ctx) => {
  const userIsConnected = await isConnected(ctx.from.id);
  const userIsVolunteer = await isVolunteer(ctx.from.id);
  if (!userIsConnected) {
    ctx.reply(`you are disconnected. use /start to reconnect.`);
  }
  // volunteer guard
  else if (userIsVolunteer) {
    ctx.reply(`oops, something went wrong...`);
    return;
  } else {
    const args = ctx.update.message.text.split(' ');
    if (args.length === 1) {
      ctx.reply(`no user id found. use /reportUser [userId]`);
      return;
    }
    ctx.sendMessage(
      `volunteer ${ctx.from.id}, ${ctx.from.first_name}, ${ctx.from.username} has reported user ${args[1]}. /blockUser [userId] to block user`,
      {
        chat_id: 222442132, // TODO: admin id, make it send to all admins
      }
    );
  }
});

// Comment this out first -> connect to express server
// bot.launch({
//   webhook: {
//     domain: 'localhost', // Update with your server's domain
//     port: process.env.PORT || 3000,
//   },
// });

// Command for general users to request help
// bot.command("getHelp", async (ctx) => {
//   const userId = ctx.from.id;
//   if (!users[userId].isChatting) {
//     //note this will break the code; should query database
//     // Implement logic to match the user with an available volunteer
//     // Set up an anonymous chat session
//     // You can use ctx.reply to communicate with the user
//     await ctx.reply("Finding a volunteer to help you...");
//     // Set the isChatting flag to true to indicate an active chat session
//     users[userId].isChatting = true;
//   } else {
//     // Inform the user that they are already in an active chat session
//     await ctx.reply("You are already in an active chat session.");
//   }
// });

// bot.command("endChat", async (ctx) => {
//   const userId = ctx.from.id;
//   if (users[userId].isChatting) {
//     //note this will break the code; should query database
//     // Implement logic to end the chat session
//     // You can use ctx.reply to communicate with the user
//     await ctx.reply("Chat session ended.");
//     // Set the isChatting flag to false to indicate the end of the chat session
//     users[userId].isChatting = false;
//   } else {
//     // Inform the user that they are not in an active chat session
//     await ctx.reply("You are not in an active chat session.");
//   }
// });

// Command for volunteers to start volunteering
bot.command('startVolunteering', async (ctx) => {
  const userIsConnected = await isConnected(ctx.from.id);
  const userIsVolunteer = await isVolunteer(ctx.from.id);
  if (!userIsVolunteer) {
    ctx.reply('oops, something went wrong...');
  } else if (!userIsConnected) {
    ctx.reply(`you are disconnected. use /start to reconnect.`);
  } else {
    const userId = ctx.from.id;
    // Implement logic for a volunteer to start volunteering
    // You can use `ctx.reply` to communicate with the volunteer
    await ctx.reply('You are now volunteering.');
  }
});

// Command for volunteers to end volunteering
bot.command('endVolunteering', async (ctx) => {
  const userIsVolunteer = await isVolunteer(ctx.from.id);
  if (!userIsVolunteer) {
    ctx.reply('oops, something went wrong...');
  } else if (!isConnected(ctx.from.id)) {
    ctx.reply(`you are disconnected. use /start to reconnect.`);
  } else {
    const userId = ctx.from.id;
    // Implement logic for a volunteer to end volunteering
    // You can use `ctx.reply` to communicate with the volunteer
    await ctx.reply('You have ended your volunteering session.');
  }
});

// Handle unknown commands
bot.on('text', (ctx) => {
  // This will be triggered when the user sends a message that doesn't match any defined command
  ctx.reply('Command not found. Use /start to use valid commands.');
});

bot.launch();
