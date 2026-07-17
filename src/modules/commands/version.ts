import type { ChatInputCommandInteraction } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { SlashCommandBuilder } from 'discord.js'
import commandRegistry from './CommandRegistry'

const commandInfo: CommandInfo = {
  name: 'version',
  description: '版本更新紀錄',
}

commandRegistry.set(commandInfo.name, {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description),

  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({ embeds: [{
      color: 0xFFFFFF,
      thumbnail: { url: interaction.client.user.displayAvatarURL() },
      title: '版本更新紀錄',
      description: '詳見 https://github.com/nakamuraao/siesta',
      fields: [
        { name: 'v 4.5.1 (2026/6/10)', value: '修正錯誤與資料庫重整' },
        { name: 'v 4.5.2 (2026/6/20)', value: '更新生日模組(Oliver Mak)' },
        { name: 'v 4.5.3 (2026/6/21)', value: '修正錯誤與更新discord.js v.14' },
      ],
    }] })
  },
} satisfies Command)
