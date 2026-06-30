import type { ChatInputCommandInteraction } from 'discord.js'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import { isAdmin, logTime } from '@/utils/general'

export default {
  data: new SlashCommandBuilder()
    .setName('kickrole')
    .setDescription('踢出身分組中的成員')
    .addStringOption(option =>
      option.setName('kick-or-ban')
        .setDescription('kick or ban')
        .addChoices({ name: 'kick', value: 'kick' }, { name: 'ban', value: 'ban' })
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('目標身分組')
        .setRequired(true)),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!isAdmin(interaction)) {
      await interaction.reply({ content: '此指令僅限管理員使用', flags: MessageFlags.Ephemeral })
      return
    }
    if (!interaction.guild) return
    const channel = interaction.channel
    if (!channel?.isSendable()) return

    const targetrole = interaction.options.getRole('role', true)
    const allMembers = await interaction.guild.members.fetch()
    const choice = interaction.options.getString('kick-or-ban', true)
    allMembers.forEach((member) => {
      if (member.roles.cache.some(role => role.id === targetrole.id)) {
        if (choice === 'kick') {
          member.kick().catch(() => {
            channel.send(`無法踢出<@${member.id}>`)
          })
        } else if (choice === 'ban') {
          member.ban().catch(() => {
            channel.send(`無法停權<@${member.id}>`)
          })
        }
      }
    })
    await interaction.reply('已踢出身分組中的成員')

    logTime()
    console.log(`${interaction.user.displayName} 踢出了 ${targetrole.name} (${interaction.guild.name})\n-----------------------`)
  },
}
