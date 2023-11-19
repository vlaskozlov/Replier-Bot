const { PermissionsBitField, ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder, Events } = require('discord.js');

module.exports.run = async (bot, interaction) => {
    if (!interaction.isContextMenuCommand()) return;
    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply(`${interaction.user}, у тебя нет прав для использования этой команды!`);
    const user = interaction.targetMessage

    const modal = new ModalBuilder()
    .setCustomId('modal')
    .setTitle('Окошко-лукошко');

    const MessageContent = new TextInputBuilder()
    .setCustomId('userReply')
    .setLabel("Введи текст для ответа на сообщение")
    .setStyle(TextInputStyle.Short);


    const firstActionRow = new ActionRowBuilder().addComponents(MessageContent);

    modal.addComponents(firstActionRow);

    if (interaction.isMessageContextMenuCommand()) await interaction.showModal(modal);

    bot.on(Events.InteractionCreate, async interaction => {
        if (interaction.isModalSubmit()) {
            
            const reply = interaction.fields.getTextInputValue('userReply');
            await user.reply(reply)
            if (interaction.customId === 'modal') {
                interaction.reply({content: 'Ответ успешно отправлен!', ephemeral: true })
            }
        }
    })
}




module.exports.info = {
    name: 'context-menus',
    type: 3
}