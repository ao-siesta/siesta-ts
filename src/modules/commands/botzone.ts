import type { ChatInputCommandInteraction } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import BotChannel from '@/data/database/dbFunction/BotChannel'
import { isAdmin, logTime } from '@/utils/general'

const commandInfo: CommandInfo = {
  name: 'botzone',
  description: '設定機器人區域',
}

export default {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description)
    .addStringOption(option =>
      option.setName('move')
        .setDescription('選擇動作')
        .setRequired(true)
        .addChoices({ name: 'add', value: 'add' }, { name: 'remove', value: 'remove' })),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!isAdmin(interaction)) {
      interaction.reply({ content: '此指令僅限管理員使用', flags: MessageFlags.Ephemeral })
      return
    }

    const channelId = interaction.channel?.id
    if (!channelId) return

    const botzone = new BotChannel()
    const move = interaction.options.getString('move', true)
    const channel = await botzone.findChannel(channelId)

    if (move === 'add') {
      if (!channel) {
        await botzone.addBotZone(channelId)
        await interaction.reply('已將此頻道設為機器人區域')
        logTime()
        console.log(`-----------------------\n${interaction.user.displayName} 新增了機器人頻道 ${channelId}\n-----------------------`)
      } else {
        await interaction.reply({ content: '此頻道已經是機器人區域', flags: MessageFlags.Ephemeral })
      }
    } else if (move === 'remove') {
      if (!channel) {
        await interaction.reply({ content: '此頻道非機器人區域', flags: MessageFlags.Ephemeral })
      } else {
        await botzone.deleteChannel(channelId)
        await interaction.reply('已取消機器人區域')
        logTime()
        console.log(`-----------------------\n${interaction.user.displayName} 取消了機器人頻道 ${channelId}\n-----------------------`)
      }
    } else {
      await interaction.reply({ content: '執行此指令時出現問題', flags: MessageFlags.Ephemeral })
    }
  },
} satisfies Command
