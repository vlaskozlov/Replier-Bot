const { EmbedBuilder } = require('discord.js')
const { PermissionsBitField } = require('discord.js');

module.exports.run = async (bot, interaction) => {
    let unbanUser = interaction.options.getUser('user');
    let reason = interaction.options.getString('reason')
    let guild = interaction.guild;

    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.BanMembers)) return interaction.reply(`${user}, у тебя нет прав для использования этой команды!`);
    else if (interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.BanMembers)) {
        guild.members.unban(unbanUser, [reason]) 
    
        const unbanEmbed1 = new EmbedBuilder()
        .setTitle('Разбан участника!')
        .setDescription(`${unbanUser} успешно разбанен.`)
        .setColor(0x7FFF00)
        .setFields(
            { name: '**Модератор**', value: `${interaction.member}` }
        )

        const unbanEmbed = new EmbedBuilder()
        .setTitle('Разбан участника!')
        .setDescription(`${unbanUser} успешно разбанен.\nПричина: ${reason}`)
        .setColor(0x7FFF00)
        .setFields(
            { name: '**Модератор**', value: `${interaction.member}` }
        )
        
        if (reason) { interaction.reply({ embeds: [unbanEmbed] }) }
        if (!reason) { interaction.reply({ embeds: [unbanEmbed1] }) }
    }
}

module.exports.info = {
    name: 'unban',
    options: [
        {
            name: 'user',
            description: 'Введи ник или айди того, кого ты желаешь разбанить',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'Напиши причину разбана',
            type: 3,
            required: false
        }
    ],
    description: 'Разбан участника на сервере'
}