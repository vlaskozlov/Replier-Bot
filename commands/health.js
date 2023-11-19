module.exports.run = async (bot, interaction) => {
    let time = (bot.uptime / 1000);
    let days = Math.floor(time / 86400);
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    interaction.reply({
        embeds: [
            {
                title: "Состояние",
                description: `🏓Задержка хостинга: ${Date.now() - interaction.createdTimestamp}мс.\n🧵Задержка API Discord: ${Math.round(bot.ws.ping)}мс.\n⏳Время работы: ${days} дней, ${hours} часов, ${minutes} минут, ${seconds} секунд`,
                color: 0xDC143C,
            }
        ],
        ephemeral: false
    })
}

module.exports.info = {
    name: "health",
    description: "Задержка хостинга и API Discord",
    defaultPermission: true 
}