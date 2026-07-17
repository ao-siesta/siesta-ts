import type { ChatInputCommandInteraction } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { SlashCommandBuilder } from 'discord.js'
import { quoteString } from '@/utils/general'
import commandRegistry from './CommandRegistry'

const commandInfo: CommandInfo = {
  name: 'listbot',
  description: '列出伺服器中的機器人',
}

commandRegistry.set(commandInfo.name, {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.guild) return

    const allMembers = await interaction.guild.members.fetch()
    const output = allMembers.filter(m => m.user.bot).map(m => `${quoteString(m.id)} ${quoteString(m.user.displayName)}`).join('\n')

    await interaction.reply({ embeds: [{
      color: 0xFFFFFF,
      title: '伺服器中的機器人',
      description: output,
    }] })
  },
} satisfies Command)
