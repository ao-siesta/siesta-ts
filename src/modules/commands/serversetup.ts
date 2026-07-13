import type { ChatInputCommandInteraction } from 'discord.js'
import type { Command, CommandInfo } from '@/types/discord'
import { MessageFlags, SlashCommandBuilder } from 'discord.js'
import Servers from '@/data/database/dbFunction/Servers'
import { isAdmin } from '@/utils/general'

const commandInfo: CommandInfo = {
  name: 'serversetup',
  description: '伺服器資訊設定',
}

export default {
  data: new SlashCommandBuilder()
    .setName(commandInfo.name)
    .setDescription(commandInfo.description)
    .addSubcommand(sub =>
      sub.setName('setup')
        .setDescription('設定伺服器資訊')
        .addRoleOption(option =>
          option.setName('admin')
            .setDescription('管理員身分組')
            .setRequired(true)))
    .addSubcommand(sub =>
      sub.setName('list')
        .setDescription('列出伺服器資訊')),

  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.guild) return
    if (!isAdmin(interaction)) {
      interaction.reply({ content: '此指令僅限管理員使用', flags: MessageFlags.Ephemeral })
      return
    }

    // const guildId = interaction.guild.id
    const servers = new Servers()
    const s = await servers.listServer()
    console.log('s', s)

    // const subSmd = interaction.options.getSubcommand()
    // if (subSmd === 'setup') {
    //   const guildName = interaction.guild.name
    //   const adminrole = interaction.options.getRole('admin', true)
    //   const adminroleId = adminrole.id

    //   if (!await servers.findServer(guildId)) {
    //     await servers.addServer(guildId, guildName, adminroleId)
    //   } else {
    //     await servers.updateServer(guildId, guildName, adminroleId)
    //   }
    //   await interaction.reply('已更新伺服器設定')
    // } else if (subSmd === 'list') {
    //   if (isOwner(interaction.user.id)) {
    //     const serverList = await servers.listServer()
    //     await interaction.reply({ embeds: [{
    //       color: 0xFFFFFF,
    //       title: '所有伺服器之管理員身分組',
    //       description: serverList,
    //     }] })
    //   } else {
    //     const admin = await servers.findAdminRole(guildId)
    //     if (!admin) return

    //     await interaction.reply({ embeds: [{
    //       color: 0xFFFFFF,
    //       title: '本伺服器之管理員身分組',
    //       description: `${quoteString(admin)} ` + `<@&${admin}>`,
    //     }] })
    //   }
    // }
  },
} satisfies Command
