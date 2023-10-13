const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
// ctx.message.from.username
bot.start((ctx) => ctx.reply("Welcome to HelpLine Bot."));
bot.command("volunteer", (ctx) =>
  ctx.reply(`volunteer ${ctx.message.from.username}`)
);
bot.launch();
