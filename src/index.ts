import type { ChatInputCommandInteraction } from 'discord.js'
import c from 'ansis'
import { ActivityType, Client, GatewayIntentBits, MessageFlags, Partials } from 'discord.js'
import { Sequelize } from 'sequelize'
import { miaomiCh, oid, token } from '@/config.json'

import CommandRegistry from '@/modules/commands/CommandRegistry'
import '@/modules/commands/index'

import CronJobHelper from './modules/cronjob/helper'
import taskScheduler from './modules/cronjob/task-scheduler'
import '@/modules/cronjob/jobs/index'

import BirthdayDB from '@/data/database/dbStructure/Birthday'
import BotChannelDB from '@/data/database/dbStructure/BotChannel'
import BotLogDB from '@/data/database/dbStructure/BotLog'
import ServersDB from '@/data/database/dbStructure/Servers'
import MsgDeleted from './modules/logEvents/messageDeleted'
import MsgUpdated from './modules/logEvents/messageUpdate'

import fun from '@/modules/messageUtility/index'
import watching from '@/modules/messageUtility/monitor/watching'
import webhook from '@/modules/webhooks/index'

const client = new Client({
  partials: [Partials.Channel, Partials.Message, Partials.User],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
})

client.once('clientReady', async (client) => {
  // #region : Commands
  client.commands = CommandRegistry
  CommandRegistry.print()
  // #endregion

  // #region : Database
  const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
  })

  try {
    await Promise.all([
      BirthdayDB(sequelize).sync(),
      BotChannelDB(sequelize).sync(),
      BotLogDB(sequelize).sync(),
      ServersDB(sequelize).sync(),
    ])
  } catch (error) {
    console.error('Cannot connect to the database:', error)
  }
  // #endregion

  // #region : Cron job
  try {
    const cronHelper = new CronJobHelper(client, miaomiCh)
    taskScheduler.setup(client, cronHelper)

    console.log(c.yellow.bold`\nScheduled Tasks:`)
    console.log(taskScheduler.jobList)
  } catch (error) {
    console.error('Error setting up cron jobs:', error)
  }
  // #endregion

  client.user.setActivity('蒼アオ', { type: ActivityType.Watching })
  console.log(`\n--------------------------------------------`)
  console.log(`以 ${c.green.bold(client.user.displayName)} 登入`)
  console.log(`--------------------------------------------\n`)
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)
  if (!command) return

  try {
    await command.execute(interaction as ChatInputCommandInteraction, client)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: `執行指令時出現問題，請洽伺服器管理員或<@${oid}>`, flags: MessageFlags.Ephemeral })
  }
})

client.on('messageDelete', async (msg) => {
  if (!msg.author || msg.author.bot) return
  MsgDeleted.execute(msg, client)
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (oldMessage.content === newMessage.content) return
  MsgUpdated.execute(oldMessage, newMessage, client)
})

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return
  await Promise.allSettled([
    webhook.execute(msg), // webhook
    watching.execute(msg, client), // 監控
    fun.execute(msg), // fun
  ])
})

client.login(token)
