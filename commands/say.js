const { PermissionsBitField, ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder } = require('discord.js');

module.exports.run = async (bot, interaction) => {
    let say = interaction.options.getString('say')

    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply(`${interaction.user}, у тебя нет прав для использования этой команды!`);
    interaction.channel.send(say)
    interaction.reply({ content: '.', ephemeral: false})
    await interaction.deleteReply()
    console.log(`${interaction.user.username} использовал команду say с содержанием "${say}"`)

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
        },
    ]
}