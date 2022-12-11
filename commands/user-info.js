module.exports.run = async (bot, interaction) => {
    let user = interaction.guild.members.cache.get((interaction.options.getUser('user') || interaction.user).id)
    let roles = user.roles.cache.filter(r => r.id != interaction.guild.id).map(role => `<@&${role.id}>`).join(', ')

    interaction.reply({
        embeds: [
            {
                title: "Результат выполнения команды",
                description: `Твой тег пользователя: ${user.user.tag}\nТвой айди: ${user.id}\n${roles}\n${user}`,
                color: 0x7FFF00,
                footer: {
                    text: "Можешь сохранить себе на память :)"
                },
            }
        ],
        ephemeral: false
    })
}

module.exports.info = {
    name: 'user-info',
    description: 'Информация о пользователе, его айди и роли',
    options: [
        {
            name: "user",
            description: "Введи ник пользователя в это поле",
            type: 6,
            required: false
        }
    ]
}