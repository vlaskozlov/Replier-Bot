const { EmbedBuilder } = require('discord.js')
const { QuickDB } = require ("quick.db");

module.exports.run = async (bot, interaction, guildMember) => {
    const {author} = interaction;
    let guild = interaction.guild
    const db = new QuickDB({ filePath: `settings/${guild.name}.sqlite` });
    let user = interaction.options.getMember('user') || interaction.member;
    const type = interaction.options.getInteger('type')
    const colorrole = await (user||member).displayColor;
    const url = await user.user.avatarURL({dynamic: true, size: 1024});
    const local = await user.avatarURL({dynamic: true});
    if(!url) return interaction.reply({ content: `У ${user?user:author} нет авы!`, ephemeral: true });
    const settings = await db.table(`settings`)

    const set = await settings.get('avatar')
    if (set === "off") return interaction.reply('Команда отключена')

    if (set === 'on') {
    const memberEmbed = new EmbedBuilder()
        .setTitle(`Локальная аватарка пользователя\n${user.user.tag}`)
        .setDescription(`**[Скачать аватарку](${local})**`)
        .setColor(colorrole)
        .setImage(local)
        .setFooter({ text: 'Если тут пусто, то значит, что у пользователя нет локальной аватарки.' })

    const userEmbed = new EmbedBuilder()
        .setColor(colorrole)
        .setImage(url)
        .setDescription(`**[Скачать аватарку](${url})**`)
        .setTitle(`Аватарка пользователя\n${user.user.tag}`)
    
    if (type === 1) return interaction.reply({ embeds: [memberEmbed], ephemeral: false})
    //else if (local) return interaction.reply({ content: `У ${user?user:author} нет локальной авы!`, ephemeral: true });
    else if (!type) interaction.reply({ embeds: [userEmbed], ephemeral: false });

    }
}

module.exports.info = {
    name: 'аvatar',
    options: [
        {
            name: "user",
            description: "Введи ник пользователя в это поле",
            type: 6,
            required: false
        },
        {
            name: 'type',
            description: 'Выбери, если хочешь увидеть локальную аватарку',
            choices: [
                {
                    name: 'local',
                    value: '1'
                },
            ],
            type: 4
        }
    ],
    description: 'Команда для воровства аватарки пользователя'
}