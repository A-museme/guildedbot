require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { handleClear } = require('./commands/clear');
const { handleRole } = require('./commands/role');
const { handleClean } = require('./commands/clean');
const { handleHelp } = require('./commands/help');
const { handleArmory } = require('./commands/armory');
const { handleLogs } = require('./commands/logs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

const PREFIX = '!';

client.once('ready', () => {
  console.log(`✅ Guilded Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  // Commands available to everyone
  if (command === 'help') {
    return handleHelp(message).catch(console.error);
  }
  if (command === 'armory') {
    return handleArmory(message, args).catch(console.error);
  }
  if (command === 'logs') {
    return handleLogs(message, args).catch(console.error);
  }

  // All other commands require Admin role
  const member = message.member;
  const hasAdmin = member?.permissions.has('Administrator') ||
    member?.roles.cache.some(r => r.name.toLowerCase() === 'admin');

  if (!hasAdmin) {
    return message.reply('❌ You need the **Admin** role to use moderation commands.');
  }

  try {
    switch (command) {
      case 'clear':
        await handleClear(message, args);
        break;
      case 'role':
        await handleRole(message, args);
        break;
      case 'clean':
        await handleClean(message);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error(`[Error] Command "${command}" failed:`, err);
    message.reply('⚠️ An error occurred while executing that command.').catch(() => {});
  }
});

client.login(process.env.DISCORD_TOKEN);