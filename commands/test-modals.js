const { ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder } = require('discord.js')

module.exports.run = async (bot, interaction) => {
    const modal = new ModalBuilder()
    .setCustomId('myModal')
    .setTitle('Окошко-лукошко');

    const favoriteColorInput = new TextInputBuilder()
    .setCustomId('favoriteColorInput')
    .setLabel("Какой цвет тебе по душе?")
    .setStyle(TextInputStyle.Short);

    const hobbiesInput = new TextInputBuilder()
    .setCustomId('hobbiesInput')
    .setLabel("Какое твоё любимое хобби?")
    .setStyle(TextInputStyle.Paragraph);

    const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
    const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
}

module.exports.info = {
    name: 'test-modals',
    description: 'Команда для теста модальных окон'
}