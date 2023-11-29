const { isApplicationCommandDMInteraction } = require('discord-api-types/utils/v9');
const Discord = require('discord.js'),
    config = require('./config.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, SelectMenuBuilder, TextInputStyle, EmbedBuilder, messageEmbed, codeBlock } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');                                     
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions] });   
const { ContextMenuCommandBuilder, ApplicationCommandType, TextInputBuilder } = require('discord.js');                            
const { channel } = require('diagnostics_channel');
const info = require('./package.json');
const fs = require('fs');
const LogChannel = bot.channels.cache.get('1073923196664950785')
bot.login(config.token);                                                                   

let commands = {} 

bot.on('ready', (Client)=>{                                                                         
    console.log('Бот запущен');
    fs.readdirSync("commands").forEach(el => {
        if (el.endsWith(".js")) {
            let command = require(`./commands/${el}`)
                if (command.info) commands[command.info.name] = command
        }
    })
    bot.guilds.cache.forEach(guild => bot.application.commands.set(
        Object.values(commands).map(command => command.info)//, guild.id
    ))

const count = bot.guilds.cache.size
bot.user.setActivity(`Смотрю на ${count} серверов`),
bot.user.setPresence({status: 'idle'})
})

process.on('uncaughtException', async(error) => {
    console.error(error)
});

bot.on('guildCreate', async guild => {
    const serverAddLog = new EmbedBuilder()
    .setTitle("Добавление на сервер")
    .setDescription(`Я был только что добавлен на сервер с названием: ${guild.name}\nВсего участников сервера: ${guild.memberCount}.\n\nВсего теперь у меня серверов: ${bot.guilds.cache.size}`)
    .setColor(0x7FFF00)
    .setTimestamp()

    LogChannel.send({embeds: [serverAddLog]})
    const count = bot.guilds.cache.size
    bot.user.setActivity(`Смотрю на ${count} серверов`)
})

bot.on('guildDelete', guild => {
    const serverDeleteLog = new EmbedBuilder()
    .setTitle("Удаление с сервера")
    .setDescription(`Я был кикнут с сервера ${guild.name}\nОбщее количество участников сервера: ${guild.memberCount}\n\nОбщее количество серверов теперь: ${bot.guilds.cache.size}`)
    .setColor(0xDC143C)
    .setTimestamp()

    const LogChannel = bot.channels.cache.get('1073923196664950785')
    LogChannel.send({embeds: [serverDeleteLog]})
    const count = bot.guilds.cache.size
    bot.user.setActivity(`Смотрю на ${count} серверов`)
})

bot.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        let command = commands[interaction.commandName]
        if (command) await command.run(bot, interaction)
    } else if (interaction.isButton()) {
        if (interaction.customId === 'primary') interaction.reply({content: 'тест'})
    } else if (interaction.isSelectMenu()) {
        const selected = interaction.values[0];
        if (selected === 'first_option') await interaction.update(`${interaction.user.username}, ты выбрал птицу завтрашнего дня!`) 
        else if (selected === 'second_option') await interaction.update(`${interaction.user.username}, тебе нравятся обе палочки твикс. Так держать!`) 
        else if (selected === 'third_option') await interaction.update(`${interaction.user.username}, это не выбор, варианты ниже.`) 
        else if (selected === 'fourth_option') await interaction.update(`${interaction.user.username}, ты выбрал пики. Тебя зарезали до потери сознания💀`)
        else if (selected === 'fifth_option') await interaction.update(`${interaction.user.username}, ты выбрал писюлю дрочёную. Твой анус расширился на 20см. ||У разрабов ботов на ДЖС такое-же дупло😉||`)
    } /*else if (interaction.isModalSubmit()) {
        if (interaction.customId === 'myModal') interaction.reply({content: 'zalupa'})
        const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
        const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
        console.log(`Результат выполнения команды test-modals\nОтветы от пользователя ${interaction.user.username}\nЛюбимый цвет: ${favoriteColor}, любимое хобби: ${hobbies}`);

    }*/
})

.on('messageCreate', async (message) => {
    if(message.author.bot) return;

    else if(message.content.split(' ')[0] == '!eval') {
        if (!['521275527936606208', '853937919601016833', '663378999103324180', '456330254093385730'].includes(message.author.id)) return message.reply({ content: 'Ты не можешь использовать эту команду!' });
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
