const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json")
module.exports = {
    name: 'say',
    aliases: ["say"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let uye = message.guild.memberCount
        let aktif = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
        let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
        let topses = message.guild.members.cache.filter(s => s.voice.channel);
        let yayın = topses.filter(s => s.voice.streaming);
        let mik = topses.filter(s => s.voice.selfMute).size;
        let kulak = topses.filter(s => s.voice.selfDeaf).size;
        message.reply({ embeds: [embed.setDescription(`
\`●\` Sunucumuzda **${uye}** üye ve **${aktif}** aktif bulunuyor.

\`●\` Son 1 Saatte Giren Üyeler  **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**
\`●\` Son 1 Günde Giren Üyeler  **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**
\`●\` Son 1 Haftada Giren Üyeler **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**
\`●\` Son 1 Ayda Giren Üyeler **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**

\`●\` Sesli kanallarında **${sesli}** kullanıcı bulunuyor.

- Mikrofonu kapalı: **${mik}**
- Kulaklığı kapalı: **${kulak}**
- Yayında: **${yayın.size}** 
    `)] });
      
    }
}