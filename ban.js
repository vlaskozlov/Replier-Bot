const { EmbedBuilder } = require('discord.js')
const { PermissionsBitField } = require('Discord.js');

module.exports.run = async (bot, interaction) => {
    let banUser = interaction.options.getMember('user');
    let reason = interaction.options.getString('reason');
    let guild = interaction.guild;

    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.BanMembers)) return interaction.reply(`${user}, у тебя нет прав для использования этой команды!`);
    else if (interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.BanMembers)) {
        guild.members.ban(banUser, {reason: `${reason}`} )

        const banEmbed = new EmbedBuilder()
            .setTitle('Бан участника!')
            .setDescription(`${banUser} успешно забанен.`)
            .setColor(0xDC143C)
            .setFields(
                { name: '**Модератор**', value: `${interaction.member}` },
                { name: '**Причина**', value: `${reason}` }
            )

        const banEmbed2 = new EmbedBuilder()
            .setTitle('Бан участника!')
            .setDescription(`${banUser} успешно забанен.`)
            .setColor(0xDC143C)
            .setFields(
                { name: '**Модератор**', value: `${interaction.member}` }
            )
        if (reason) {
            interaction.reply({ embeds: [banEmbed] })
        }
        if (!reason) {
            interaction.reply({ embeds: [banEmbed2] })
        }
    }
}

module.exports.info = {
    name: 'ban',
    options: [
        {
            name: 'user',
            description: 'Введи ник или айди того, кого ты желаешь забанить',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'Введи причину бана',
            type: 3,
            required: false
        }
    ],
    description: 'Бан участника на сервере'
}