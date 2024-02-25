const { EmbedBuilder, PermissionsBitField, codeBlock } = require('discord.js');

module.exports.run = async (bot, interaction) => {
    let kickUser = interaction.options.getMember('user');
    let reason = interaction.options.getString('reason');
    let guild = interaction.guild;

    if(kickUser.equals(interaction.member)) return interaction.reply(`${interaction.user}, зачем выгонять самого себя?`);
    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.KickMembers)) return interaction.reply(`${interaction.user}, у тебя нет прав для использования этой команды!`);
    else if (interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.KickMembers)) {
        await guild.members.kick(kickUser, `${reason}` ).catch((err) => interaction.reply({ content: 'ой бля кажется тут небольшие тех шоколадки, вот тебе немного говна:' + codeBlock('js', err) }))
        
        const kickEmbed = new EmbedBuilder()
            .setTitle('Кик участника!')
            .setDescription(`${kickUser} успешно кикнут.`)
            .setColor(0xDC143C)
            .setFields({ name: '**Модератор**', value: `${interaction.member}` })
        if (reason) kickEmbed.addFields({ name: '**Причина**', value: `${reason}` })
        
        interaction.reply({ embeds: [kickEmbed] }).catch(() => {})
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