import type { ChatInputCommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('listbot')
    .setDescription('列出伺服器中的機器人'),

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
}
