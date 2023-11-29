const { PermissionsBitField, ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports.run = async (bot, interaction) => {
    let say = interaction.options.getString('say')
    const LogChannel = bot.channels.cache.get('1179439129205940334') 

    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply(`${interaction.user}, у тебя нет прав для использования этой команды!`);
    interaction.channel.send(say)
    interaction.reply({ content: '.', ephemeral: false})
    await interaction.deleteReply()
    // console.log(`${interaction.user.username} использовал команду say с содержанием "${say}"`)

    const loging = new EmbedBuilder()
    .setTitle("Использование команды say")
    .setDescription(`Пользователь ${interaction.user.username} (${interaction.user.id}) использовал команду say на сервере ${interaction.guild.name} (${interaction.guildId}) с содержанием "${say}".`)
    .setColor(0xF1C40F)
    .setTimestamp()
    LogChannel.send({embeds: [loging]})

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