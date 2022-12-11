const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const info = require('../package.json')

module.exports.run = async (bot, interaction) => {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel('Поддержать бота')
        .setStyle(ButtonStyle.Link)
        .setURL(`https://www.donationalerts.com/r/vlas_kozlov`)
        .setEmoji('❤️'),
    )
    .addComponents(
        new ButtonBuilder()
        .setLabel('Сервер поддержки')
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.gg/zNPJRZZnMJ`),
    )
    .addComponents(
        new ButtonBuilder()
        .setLabel('GitHub-репозиторий')
        .setStyle(ButtonStyle.Link)
        .setURL(info.repository.url),
    )

    interaction.reply({
        components: [row],
        embeds: [
            {
                title: "Краткая информация о боте",
                description: `Название бота: ${info.name}\nВерсия бота: ${info.version}\nКраткое описание: ${info.description}\nВерсия Discord.js: ${info.dependencies['discord.js']}`,
                color: 0xFFD700,
                footer: {
                    text: "Для более подробной информации заходите на GitHub-репозиторий (кнопка снизу).\nДля помощи с ботом заходите на сервер поддержки.\nТакже вы можете поддержать бота при желании. 🤗",
                },
            },

        ],
        ephemeral: false
    })
}

module.exports.info = {
    name: 'info',
    description: 'Краткая информация о боте'
}