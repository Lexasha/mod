const config = require("../../../config.json");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "warn",
    aliases: ["warn"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.penals.warn.staff)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        const member =  message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const reason = args.splice(1).join(" ")
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!reason) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir sebep belirtmelisin.")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        db.push(`warns_${member.id}`, `${author} tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle uyarılmış.`)
        db.push(`sicil_${member.id}`, `${author} tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle uyarılmış.`)
        db.add(`warn_${member.id}`, 1)
        db.add(`points_${member.id}`, (config.penals.points.warnpoints));
        db.add(`ceza_${guild.id}`, 1)
        const cezaID = await db.fetch(`ceza_${guild.id}`)
        db.set(`${cezaID}`, `${member.user.tag} kullanıcısı ${author} tarafından ${moment(Date.now()).format("LLL")} tarihinde ${reason} sebebiyle uyarısı almış.`)
        message.reply({ content: (`${member} kullanıcısı **"${reason}"** sebebiyle uyarıldı. \`(Ceza ID: #${db.fetch(`ceza_${guild.id}`)})\``)}) .catch((err) => console.log(err), client.ytick(message))
        const user = client.users.cache.get(member)
        client.channels.cache.get(config.penals.warn.log).send({ embeds: [embed.setDescription(`${member} kullanıcısı ${message.author} tarafından uyarıldı.
      
        Ceza ID: \`#${db.fetch(`ceza_${guild.id}`)}\`
        Kullanıcının Toplam Ceza Puanı: \`${db.fetch(`points_${member.id}`)}\`
        Uyarılan Kullanıcı: ${member} - \`(${member.id})\`
        Uyaran Yetkili: ${author} - \`(${author.id})\`
        Uyarı Sebebi: \`${reason}\`
        Uyarılma Tarihi: \`${moment(Date.now()).format("LLL")}\``)] });
    }
}