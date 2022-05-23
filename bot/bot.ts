import { Bot } from "grammy";
import { ID_BOT } from "./config";

const bot = new Bot(ID_BOT);

bot.command("start", (ctx) => {
    ctx.reply("started")
    console.log(ctx)
});
// Handle other messages
//bot.on("message", (ctx) => ctx.reply("Got another message!"));

bot.on("message", (ctx) => {
    console.log("contexto .on", ctx)
})

bot.start();