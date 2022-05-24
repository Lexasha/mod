const moment = require("moment");
require("moment-duration-format");
const config = require("../../../config.json")

module.exports = {
    name: "yardım",
    aliases: ["y", "help"],

    execute: async (client, message, args, embed, author, channel, guild) => {
    message.reply({ embeds: [embed.setDescription
(`

\
__**Etiket Atılınca AFK Bildirimi Atar.**__
**${config.bot.prefix}afk [sebep]**

__**Etiketlenen kişinin profil bilgilerini gösterir.**__
**${config.bot.prefix}profil [ @İsim / ID ]** 

__**Üyeleri uyarırsın.**__
**${config.bot.prefix}warn [ @İsim / ID ] [sebep]**

__**Üyelerin Uyarılarına Bakarsın.**__
**${config.bot.prefix}warns [ @İsim / ID ]**

__**Sohbet Kanalında Üye Susturur.**__
**${config.bot.prefix}mute [ @İsim / ID ]**
**${config.bot.prefix}unmute [ @İsim / ID ]**

__**Sesli Kanalda Üye Susturur.**__
**${config.bot.prefix}vmute [ @İsim / ID ]** 
**${config.bot.prefix}unvmute [ @İsim / ID ]** 

__**Sunucudan Üye Yasaklar.**__
**${config.bot.prefix}ban [ @İsim / ID ]**

__**Sunucudaki Üyeleri Sayar.**__
**${config.bot.prefix}say**

`)
    .setImage("https://cdn.discordapp.com/attachments/750099161105432737/976811752190795806/Royal.gif") 
] })

    }
}
  