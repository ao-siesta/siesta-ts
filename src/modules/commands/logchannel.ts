import type { ChatInputCommandInteraction } from 'discord.js'
import type { CommandInfo } from '@/types/discord'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import BotLog from '@/data/database/dbFunction/BotLog'
import { isAdmin, logTime } from '@/utils/general'
import { CommandRegistry } from './registry'

const commandInfo: CommandInfo = {
  name: 'logchannel',
  description: '在此頻道紀錄訊息編輯與刪除',
}

CommandRegistry.set(commandInfo.name, {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description)
    .addSubcommand(sub =>
      sub.setName('add')
        .setDescription('新增記錄頻道'),
    )
    .addSubcommand(sub =>
      sub.setName('remove')
        .setDescription('移除記錄頻道'),
    ),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!isAdmin(interaction)) {
      interaction.reply({ content: '此指令僅限管理員使用', flags: MessageFlags.Ephemeral })
      return
    }
    if (!interaction.channel || !interaction.guild) return

    const channelId = interaction.channel.id
    const serverId = interaction.guild.id

    const botLog = new BotLog()
    const logChannel = await botLog.findLogChannel(serverId)
    const subCmd = interaction.options.getSubcommand()

    if (subCmd === 'add') {
      if (logChannel) {
        await interaction.reply({ content: '此頻道已經是紀錄頻道', flags: MessageFlags.Ephemeral })
      } else {
        await botLog.addLogChannel(serverId, interaction.guild.name, channelId)
        await interaction.reply('已將此頻道設為記錄頻道')
        logTime()
        console.log(`${interaction.user.displayName} 新增了紀錄頻道 ${channelId}`)
      }
    } else if (subCmd === 'remove') {
      if (logChannel) {
        await botLog.deleteLogChannel(serverId)
        await interaction.reply('已取消紀錄頻道')
        logTime()
        console.log(`${interaction.user.displayName} 取消了紀錄頻道 ${channelId}`)
      } else {
        await interaction.reply({ content: '此頻道非紀錄頻道', flags: MessageFlags.Ephemeral })
      }
    }
  },
})
