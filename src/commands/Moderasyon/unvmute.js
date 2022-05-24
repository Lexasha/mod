const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")

module.exports = {
    name: "unvmute",
    aliases: ["unvmute"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.voicemute.staff)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    let member = message.mentions.members.first() || guild.members.cache.get(args[0]) 
    if (!member) return message.reply({ embeds: [embed.setDescription(`Öncelikle geçerli bir kullanıcı belirtmelisin.`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    if (config.penals.voicemute.limit > 0 && limit.has(author.id) && limit.get(author.id) == config.penals.voicemute.limit) return channel.send("Saatlik mute açma sınırına ulaştın!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (!message.member.permissions.has("ADMINISTRATOR") && member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [embed.setDescription("Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!")] })
    if(member.voice.channel) member.voice.setMute(false).catch();
    message.reply({ content: (`${member} kullanıcısının seste susturulması kaldırıldı.`)}).catch((err) => console.log(err), client.ytick(message))
    client.channels.cache.get(config.penals.voicemute.log).send({ embeds: [embed.setDescription(`     
    ${member ? member.toString(): member.username} kullanıcısının ${author} tarafından sesli kanallarda susturulması kaldırıldı.

    Kullanıcı: ${member ? member.toString() : ""} - \`(${member.id})\`
    Yetkili: ${author} - \`(${author.id})\`
    Tarih: \`${moment(Date.now()).format("LLL")}\``)] });
  }
}