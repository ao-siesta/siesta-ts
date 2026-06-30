import type { ChatInputCommandInteraction } from 'discord.js'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('inrole')
    .setDescription('查看身分組中的成員')
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('目標身分組')
        .setRequired(true)),

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) return

    const targetrole = interaction.options.getRole('role', true)
    const roles = await interaction.guild.roles.fetch()
    const members = roles.get(targetrole.id)?.members

    if (!members || members.size === 0) {
      await interaction.reply({ content: '身分組中沒有成員', flags: MessageFlags.Ephemeral })
    } else {
      await interaction.reply({
        embeds: [{
          color: 0xFFFFFF,
          title: `在 ${targetrole.name} 中的成員`,
          fields: members.map(m => ({ name: m.displayName, value: m.id })),
        }],
      })
    }
  },
}
