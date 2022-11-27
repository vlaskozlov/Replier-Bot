const { isApplicationCommandDMInteraction } = require('discord-api-types/utils/v9');
const Discord = require('discord.js'),
    config = require('./config.json');
const { intersection } = require('zod');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');                                     //id guild 927213497631244388
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });                                 //bot.application.commands.fetch()
bot.login(config.token);                                                                         //.then(cmds => cmds.find(cmd => cmd.name === "name command"));
                                                                                                 //bot.application.commands.delete('')
bot                                                                                              //.then(console.log)
.on('ready', (Client)=>{                                                                         //.catch(console.error);
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
    description: 'Информация о пользователе, его айди',
    defaultPermission: true
})

bot.on('interactionCreate', interaction => {
    if (!interaction.isCommand()) return;

    if(interaction.commandName === 'user-info') {
        interaction.reply({
            embeds: [
                {
                    title: "Результат выполнения команды",
                    description: `Твой тег пользователя: ${interaction.user.tag}\nТвой айди: ${interaction.user.id}`,
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
}
})
})

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