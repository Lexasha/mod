const Discord = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: "kanal-kilit",
    aliases: ["kanal-kilit", "kanalkilit"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const content = args[0];

        if (!content) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir seçenek belirtin! `.kilit aç/kapat`")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));

        if (content === "aç") {
            let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
            message.channel.permissionOverwrites.edit(everyone.id, {
                'SEND_MESSAGES': null,

            })
            return message.reply({ embeds: [embed.setDescription(`<#${message.channel.id}> kanalının kilidini, ${message.author} açtı.`)] });
        }

        if (content === "kapat") {
            let everyone = guild.roles.cache.find(r => r.name === "@everyone");
            message.channel.permissionOverwrites.edit(everyone.id, {
                SEND_MESSAGES: false
            });
            return message.reply({ embeds: [embed.setDescription(`<#${message.channel.id}> kanalının kilidini, ${message.author} kapattı.`)] });
        }
    }

}