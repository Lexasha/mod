const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name: "kullanıcı-bilgi",
    aliases: ["kullanıcı-bilgi", "kullanıcıbilgi", "profil"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        
        var member = message.mentions.members.first() || guild.members.cache.get(args[0]) || message.member;
        message.reply({ embeds: [embed.setDescription(`**❯ Kullanıcı Bilgileri**
        
• Kullanıcı: ${member.toString()} (\`${member.id}\`)
• Hesap Kurulum Tarihi: \`${moment(member.user.createdAt).format("LLL")}\`

**❯ Sunucu Bilgileri**

• Sunucuya Katılma Tarihi: \`${moment(member.joinedAt).format("LLL")}\`
• En Yüksek Rolü: (${member.roles.highest})
`)] });

    }
}