const { ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js')

module.exports.run = async (bot, interaction) => {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('primary')
        .setLabel('Нажми на меня!')
        .setStyle(ButtonStyle.Primary),
    );

    interaction.reply({ content: 'Я думаю, тебе надо,', components: [row] });
}

module.exports.info = {
    name: 'test-button',
    description: 'Команда для теста кнопок'
}
