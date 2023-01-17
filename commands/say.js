const { TextChannel } = require("discord.js")

module.exports.run = async (bot, interaction) => {
    let say = interaction.options.getString('say')

    interaction.channel.send(say)
    interaction.reply({ content: '.', ephemeral: false})
    await interaction.deleteReply()
}

module.exports.info = {
    name: 'say',
    description: 'Написать сообщение от лица бота',
    options: [
        {
            name: 'say',
            description: 'Введи сюда своё сообщение',
            type: 3,
            required: true
        }
    ]
}