import type { ChatInputCommandInteraction } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import { isAdmin, logTime } from '@/utils/general'

const commandInfo: CommandInfo = {
  name: 'clearrole',
  description: '清除身分組中的成員',
}

export default {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description)
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('目標身分組')
        .setRequired(true)),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!isAdmin(interaction)) {
      await interaction.reply({ content: '此指令僅限管理員使用', flags: MessageFlags.Ephemeral })
      return
    }

    const channel = interaction.channel
    if (!channel?.isSendable() || !interaction.guild) return

    const targetrole = interaction.options.getRole('role', true)
    const allMembers = await interaction.guild.members.fetch()
    allMembers.forEach((member) => {
      if (member.roles.cache.some(role => role.id === targetrole.id)) {
        member.roles.remove(targetrole.id).catch(() => {
          channel.send('無法清除身分組成員，以下是可能原因 :\n1.此身分為機器人整合身分\n2.此身份位階太高')
        })
      }
    })
    await interaction.reply('已執行')

    logTime()
    console.log(`-----------------------\n${interaction.user.displayName} 清除了 ${targetrole.name} 中的成員 (${interaction.guild.name})\n-----------------------`)
  },
} satisfies Command
