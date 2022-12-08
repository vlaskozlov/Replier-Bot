const { isApplicationCommandDMInteraction } = require('discord-api-types/utils/v9');
const Discord = require('discord.js'),
    config = require('./config.json');
const { intersection } = require('zod');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, SelectMenuBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');                                     
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions] });   
const { QuickDB } = require ("quick.db");
const db = new QuickDB (); 
const { ContextMenuCommandBuilder, ApplicationCommandType, TextInputBuilder } = require('discord.js');                            
const { channel } = require('diagnostics_channel');
const info = require('./package.json');
bot.login(config.token);                                                                         
                                                                                                 
bot                                                                                              
.on('ready', (Client)=>{                                                                         
    console.log('Бот запущен');

    bot.application.commands.create({
        name: 'health',
        description: 'Задержка хостинга и АПИ ДС',
        defaultPermission: true
    })

    bot.on('interactionCreate', interaction => {
        if (!interaction.isCommand()) return;

        if(interaction.commandName === 'health') {
            interaction.reply({
                embeds: [
                    {
                    title: "Состояние",
                    description: `🏓Задержка хостинга: ${Date.now() - interaction.createdTimestamp}мс.\n🧵Задержка API Discord: ${Math.round(bot.ws.ping)}мс`,
                    color: 0xDC143C,
                    }
                ],
                ephemeral: false
            })
        }
    });

bot.application.commands.create({
    name: 'user-info',
    description: 'Информация о пользователе, его айди и роли',
    options: [
        {
            name: "another-user",
            description: "Введи ник пользователя в это поле",
            type: 9,
            required: false
        },
    ],
    defaultPermission: true
})

bot.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;
    
    let user = interaction.options.getUser('user');
    let member = interaction.guild.members.cache.get(interaction.user.id);
    let roles = member.roles.cache.map(r => `${r}`).join(' , ');
    
    if(interaction.commandName === 'user-info') {
        interaction.reply({
            embeds: [
                {
                    title: "Результат выполнения команды",
                    description: `Твой тег пользователя: ${interaction.user.tag}\nТвой айди: ${interaction.user.id}\n${roles}\n${member}\n${member.tag}`,
                    color: 0x7FFF00,
                    footer: {
                        text: "Можешь сохранить себе на память :)"
                    },
                }
            ],
            ephemeral: false
        })
    }
});

bot.application.commands.create({
    name: 'info',
    description: 'Краткая информация о боте',
    efaultPermission: true
})

bot.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'info') {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Сервер поддержки')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.gg/zNPJRZZnMJ`),
        )
        .addComponents(
            new ButtonBuilder()
            .setLabel('Поддержать бота❤️')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://www.donationalerts.com/r/vlas_kozlov`), 
        )
        .addComponents(
            new ButtonBuilder()
            .setLabel('GitHub-репозиторий')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://github.com/vlaskozlov/Replier-Bot`),
        )

        interaction.reply({
            components: [row],
            embeds: [
                {
                    title: "Краткая информация о боте",
                    description: `Название бота: ${info.name}\nВерсия бота: ${info.version}\nКраткое описание: ${info.description}\nВерсия Discord.js: ${info.dependencies['discord.js']}`,
                    color: 0xFFD700,
                    footer: {
                        text: "Для более подробной информации заходите на GitHub-репозиторий (кнопка снизу).\nДля помощи с ботом заходите на сервер поддержки (синяя кнопка).\nТакже вы можете поддержать бота при желании. 🤗",
                    },
                },

            ],
            ephemeral: false
        })
    }
});

/*bot.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'support') {
        interaction.reply({content: `Поддержать старания автора: https://www.donationalerts.com/r/vlas_kozlov `, ephemeral: false})
    } 
});*/ 

bot.application.commands.create({
    name: 'server-info',
    description: 'Информация о сервере',
    defaultMemberPermission: true
})

bot.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;
    let guild = interaction.guild;
    const banner = await guild.bannerURL() || null;
    const icon = await guild.iconURL() || null
    const serverEmbed = new EmbedBuilder()
    .setColor(0x7FFF00)
    .setTitle(guild.name)
    .setDescription(guild.description)
    .setThumbnail(icon)
    .setFields(
        { name: "Количество участников на сервере", value: `${guild.memberCount}` },
        { name: "Владелец сервера", value: `<@${guild.ownerId}>` }
    )
    .setImage(banner)

    if(interaction.commandName === 'server-info') {
        interaction.reply({
            embeds: [serverEmbed],
            ephemeral: false
        })
    }
})

bot.application.commands.create({
    name: 'test-button',
    description: 'Команда для теста кнопок',
    defaultPermission: true
})

bot.on('interactionCreate', interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'test-button') {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('Нажми на меня!')
            .setStyle(ButtonStyle.Primary),
        );

        interaction.reply({ content: 'Я думаю, тебе надо,', components: [row] });
    }

bot.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'primary') {
    interaction.reply({content: 'Кнопка успешно нажата :tada: '})
    ephemeral: true
}
})
});

bot.application.commands.create({
    name: 'test-menus',
    description: 'Команда для теста меню выбора',
    defaultPermission: true
})

bot.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'test-menus') {
        const row = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
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
})

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isSelectMenu()) return;

    const selected = interaction.values[0];

    if (selected === 'first_option') {
        await interaction.update(`${interaction.user.username}, ты выбрал птицу завтрашнего дня!`);
    } else if (selected === 'second_option') {
       await interaction.update(`${interaction.user.username}, тебе нравятся обе палочки твикс. Так держать!`);
    } else if (selected === 'third_option') {
        await interaction.update(`${interaction.user.username}, это не выбор, варианты ниже.`);
    } else if (selected === 'fourth_option') {
        await interaction.update(`${interaction.user.username}, ты выбрал пики. Тебя зарезали до потери сознания💀`);
    } else if (selected === 'fifth_option') {
        await interaction.update(`${interaction.user.username}, ты выбрал писюлю дрочёную. Твой анус расширился на 20см. ||У разрабов ботов на ДЖС такое-же дупло😉||`);
    }

});

bot.application.commands.create({
    name: 'test-modals',
    description: 'Команда для теста модальных окон',
    defaultPermission: true
})

const { ModalBuilder } = require('discord.js');

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'test-modals') {
        const modal = new ModalBuilder()
        .setCustomId('myModal')
        .setTitle('Окошко-лукошко');

        const favoriteColorInput = new TextInputBuilder()
        .setCustomId('favoriteColorInput')
        .setLabel("Какой цвет тебе по душе?")
        .setStyle(TextInputStyle.Short);

        const hobbiesInput = new TextInputBuilder()
        .setCustomId('hobbiesInput')
        .setLabel("Какое твоё любимое хобби?")
        .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

        modal.addComponents(firstActionRow, secondActionRow);

        await interaction.showModal(modal);
    }
})

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'myModal') {
        await interaction.reply({ content: 'Ваш ответ был успшно отправлен!' });
    }
})

bot.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;
    
    const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
    const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
    console.log(`Результат выполнения команды test-modals\nОтветы от пользователя ${interaction.user.username}\nЛюбимый цвет: ${favoriteColor}, любимое хобби: ${hobbies}`);
});

})
    




.on('messageCreate', async (message) => {
    if(message.author.bot) return;

    if(message.content == "тест") {
        message.channel.send({
            content: "Если я это пишу, то я не умер. Удивительно :tada:"
        });
    } 
    else if(message.content.split(' ')[0] == '!eval') {
        if (!['521275527936606208', '853937919601016833', '663378999103324180'].includes(message.author.id)) return;
        const util = require('util');
        let code = message.content.split(' ').splice(1).join(' ') || null;
        let isAsync = false;

        try {
            if(!code) return message.reply({ content: 'Введите код, который необходимо выполнить!', ephemeral: true });
            code = code.replace(/(```(.+)?)?/g, '');
            if(code.includes('await')) isAsync = true;
            if(isAsync) code = `(async () => {${code}})()`;
            let executed = eval(code);
            if(util.types.isPromise(executed)) executed = await executed;
            if(typeof executed !== 'string') executed = util.inspect(executed, { depth: 0, maxArrayLength: null });
            if(executed.length >= 1940) {
                message.reply({ content: 'Результат оказался слишком большим, поэтому я отправил его тебе в личку.' });
                return message.author.send({ content: `\`\`\`js\n${executed}\`\`\`` });
            }
            message.reply({ content: `\`\`\`js\n${executed}\`\`\`` });
        } catch(error) {
            message.reply({ content: `\`\`\`js\n${error}\`\`\`` });
        }
    }
});