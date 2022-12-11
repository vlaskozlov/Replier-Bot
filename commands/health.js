module.exports.run = async (bot, interaction) => {
    interaction.reply({
        embeds: [
            {
                title: "Состояние",
                description: `🏓Задержка хостинга: ${Date.now() - interaction.createdTimestamp}мс.\n🧵Задержка API Discord: ${Math.round(bot.ws.ping)}мс`,
                color: 0xDC143C,
            }
        ],
        ephemeral: false
    })
}

module.exports.info = {
    name: "health",
    description: "Задержка хостинга и АПИ ДС",
    defaultPermission: true 
}