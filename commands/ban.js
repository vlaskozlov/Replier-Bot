const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports.run = async (bot, interaction) => {
    let banUser = interaction.options.getMember('user');
    let reason = interaction.options.getString('reason');
    let guild = interaction.guild;

    if(banUser.equals(interaction.member)) return interaction.reply(`${interaction.user}, зачем банить самого себя?`);
    if(!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.BanMembers)) return interaction.reply(`${interaction.user}, у тебя нет прав для использования этой команды!`);

    await guild.members.ban(banUser, {reason}).catch(console.error);

    const banEmbed = new EmbedBuilder()
        .setTitle('Бан участника!')
        .setDescription(`${banUser} успешно забанен.`)
        .setColor(0xDC143C)
        .setFields({ name: '**Модератор**', value: `${interaction.member}` });
    if(reason) banEmbed.addFields([ { name: '**Причина**', value: `${reason}` } ]);

    return interaction.reply({ embeds: [banEmbed] });
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