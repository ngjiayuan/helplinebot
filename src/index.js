const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Start bot
bot.start((ctx) => ctx.reply('Welcome to HelpLine Bot.'));

// Comment this out first -> connect to express server 
// bot.launch({
//   webhook: {
//     domain: 'localhost', // Update with your server's domain
//     port: process.env.PORT || 3000,
//   },
// });

// Handle unknown commands
bot.on('text', (ctx) => {
  // This will be triggered when the user sends a message that doesn't match any defined command
  ctx.reply('Command not found. Please use valid commands.');
});

// Command for general users to request help
bot.command('getHelp', async (ctx) => { 
  const userId = ctx.from.id;
  if (!users[userId].isChatting) { //note this will break the code; should query database
    // Implement logic to match the user with an available volunteer
    // Set up an anonymous chat session
    // You can use ctx.reply to communicate with the user
    await ctx.reply('Finding a volunteer to help you...');
    // Set the isChatting flag to true to indicate an active chat session
    users[userId].isChatting = true;
  } else {
    // Inform the user that they are already in an active chat session
    await ctx.reply('You are already in an active chat session.');
  }
});

bot.command('endChat', async (ctx) => {
  const userId = ctx.from.id;
  if (users[userId].isChatting) {
    //note this will break the code; should query database
    // Implement logic to end the chat session
    // You can use ctx.reply to communicate with the user
    await ctx.reply('Chat session ended.');
    // Set the isChatting flag to false to indicate the end of the chat session
    users[userId].isChatting = false;
  } else {
    // Inform the user that they are not in an active chat session
    await ctx.reply('You are not in an active chat session.');
  }
});

// Command for general users to register as a volunteer
bot.command('registerAsVolunteer', async (ctx) => {
  const userId = ctx.from.id;
  // Implement logic to register the user as a volunteer
  // You can use `ctx.reply` to communicate with the user
  await ctx.reply('You are now registered as a volunteer.');
});

// Command for volunteers to start volunteering
bot.command('startVolunteering', async (ctx) => {
  const userId = ctx.from.id;
  // Implement logic for a volunteer to start volunteering
  // You can use `ctx.reply` to communicate with the volunteer
  await ctx.reply('You are now volunteering.');
});

// Command for volunteers to end volunteering
bot.command('endVolunteering', async (ctx) => {
  const userId = ctx.from.id;
  // Implement logic for a volunteer to end volunteering
  // You can use `ctx.reply` to communicate with the volunteer
  await ctx.reply('You have ended your volunteering session.');
});

// Command for volunteers to report a user
bot.command('reportUser', async (ctx) => {
  const userId = ctx.from.id;
  // Implement logic for a volunteer to report a user
  // You can use `ctx.reply` to communicate with the volunteer
  await ctx.reply('User reported.');
});

// Admin commands
bot.command('approveVolunteer', async (ctx) => {
  const adminId = ctx.from.id;
  const userId = ctx.message.from.id;
  const userTeleHandle = ctx.message.from.username;
  // Implement logic to approve a volunteer
  // You can use `ctx.reply` to communicate with the admin
  await ctx.reply(`Volunteer @${userTeleHandle} has been approved.`);
});

bot.command('removeVolunteer', async (ctx) => {
  const adminId = ctx.from.id;
  const userId = ctx.message.from.id;
  const userTeleHandle = ctx.message.from.username;
  // Implement logic to remove a volunteer
  // You can use `ctx.reply` to communicate with the admin
  await ctx.reply(`Volunteer @${userTeleHandle} has been removed.`);
});

bot.command('fetchReportedUser', async (ctx) => {
  const adminId = ctx.from.id;
  // Implement logic to fetch reported users
  // You can use `ctx.reply` to communicate with the admin
  await ctx.reply('Fetching reported users...');
});

bot.command('blockUser', async (ctx) => {
  const adminId = ctx.from.id;
  const userId = ctx.message.from.id;
  // Implement logic to block a user
  // You can use `ctx.reply` to communicate with the admin
  await ctx.reply(`User ${userId} has been blocked.`);
});

bot.command('unblockUser', async (ctx) => {
  const adminId = ctx.from.id;
  const userId = ctx.message.from.id;
  // Implement logic to unblock a user
  // You can use `ctx.reply` to communicate with the admin
  await ctx.reply(`User ${userId} has been unblocked.`);
});

bot.launch();
