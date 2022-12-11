module.exports.run = async (bot, interaction) => {
    let guild = interaction.guild
    const { EmbedBuilder } = require('discord.js')
    const banner = await guild.bannerURL({ size: 1024 }) || null
    const icon = await guild.iconURL({ size: 1024 }) || null
    const serverEmbed = new EmbedBuilder()
        .setColor(0x7FFF00)
        .setTitle(guild.name)
        .setDescription(guild.description)
        .setThumbnail(icon)
        .setFields(
            { name: "Количество участников на сервере", value: `${guild.memberCount}` },
            { name: "Владелец сервера", value: `<@${guild.ownerId}>` },
            { name: "Изображения", value: `**[Посмотреть иконку сервера](${icon})\n[Посмотреть баннер сервера](${banner})**`},
        )
        .setImage(banner)

if(interaction.commandName === 'server-info') {
    interaction.reply({
        embeds: [serverEmbed],
        ephemeral: false
        })
    }
}

module.exports.info = {
    name: 'server-info',
    description: 'Информация о сервере',
    defaultMemberPermission: true
}