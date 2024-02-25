const { ActionRowBuilder, StringSelectMenuBuilder, InteractionCollector } = require('discord.js')

module.exports.run = async (bot, interaction) => {
    const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Ничего не выбрано')
        .addOptions(
            {
                label: 'Выбери меня',
                description: 'Выбери меня, выбери меня птицей счастья завтрашнего дня',
                value: 'first_option',
            },
            {
                label: 'Завод левой и правой палочки Твикс',
                description: 'А какая палочка Твикс тебе по душе?',
                value: 'second_option',
            },
            {
                label: 'Перед тобой стул, на нём...',
                description: '...',
                value: 'third_option',
            },
            {
                label: 'Пики точёные',
                description: '...',
                value: 'fourth_option',
            },
            {
                label: 'А на другом писюля дрочёная',
                description: 'Что выберешь ты?',
                value: 'fifth_option',
            },
        ),
    );
    await interaction.reply({ content: 'Красный или синий провод?', components: [row] });
}

module.exports.info = {
    name: 'test-menus',
    description: 'Команда для теста меню выбора'
}