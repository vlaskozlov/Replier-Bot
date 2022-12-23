const { EmbedBuilder } = require('discord.js')

module.exports.run = async (bot, interaction) => {
    const {author,member} = interaction;
    let user = interaction.options.getMember('user') || interaction.member;
    const colorrole = await (user||member).displayColor;
    const url = await (user||member).user.avatarURL({dynamic: true, size: 1024});
    if(!url) return interaction.reply({ content: `У ${user?user:author} нет авы!`, ephemeral: true });
    const userEmbed = new EmbedBuilder()
        .setColor(colorrole)
        .setImage(url)
        .setDescription(`**[Скачать аватарку](${url})**`)
        .setTitle(`Аватарка пользователя\n${user.user.tag}`)
    interaction.reply({ embeds: [userEmbed], ephemeral: false });
}

module.exports.info = {
    name: 'аvatar',
    options: [
        {
            name: "user",
            description: "Введи ник пользователя в это поле",
            type: 6,
            required: false
        }
    ],
    description: 'Команда для воровства аватарки пользователя'
}