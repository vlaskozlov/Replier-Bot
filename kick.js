const { EmbedBuilder } = require('discord.js')
const { PermissionsBitField } = require('Discord.js');

module.exports.run = async (bot, interaction) => {
    let kickUser = interaction.options.getMember('user');
    let reason = interaction.options.getString('reason');
    let guild = interaction.guild;

    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(`${user}, у тебя нет прав для использования этой команды!`);
    else if (interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.KickMembers)) {
        guild.members.kick(kickUser, `${reason}` )

        const kickEmbed = new EmbedBuilder()
            .setTitle('Кик участника!')
            .setDescription(`${kickUser} успешно кикнут.`)
            .setColor(0xDC143C)
            .setFields(
                { name: '**Модератор**', value: `${interaction.member}` },
                { name: '**Причина**', value: `${reason}` }
            )
        
        const kickEmbed2 = new EmbedBuilder()
            .setTitle('Кик участника!')
            .setDescription(`${kickUser} успешно кикнут.`)
            .setColor(0xDC143C)
            .setFields(
                { name: '**Модератор**', value: `${interaction.member}` }
            )

    if (reason) {
        interaction.reply({ embeds: [kickEmbed] })
        }
    else if (!reason) {
        interaction.reply({ embeds: [kickEmbed2] })
    }
    }
}

module.exports.info = {
    name: 'kick',
    options: [
        {
            name: 'user',
            description: 'Введи ник или айди того, кого ты желаешь выгнать с сервера',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'Введи причину изгнания',
            type: 3,
            required: false
        }
    ],
    description: 'Кик участника на сервере'
}