import type { ChatInputCommandInteraction, Client } from 'discord.js'
import { ChannelType, MessageFlags, SlashCommandBuilder, ThreadAutoArchiveDuration } from 'discord.js'
import { consoleChannel } from '@/config.json'
import Servers from '@/data/database/dbFunction/Servers'
import { logTime } from '@/utils/general'

export default {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('開啟檢舉用私人討論串'),

  execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
    if (!interaction.guild || !interaction.channel || !interaction.member) return
    const channel = interaction.channel
    if (channel.type !== ChannelType.GuildText) return

    const logChannel = client.channels.cache.get(consoleChannel)
    if (!logChannel?.isSendable()) return

    const servers = new Servers(interaction.guild.id)
    if (!await servers.findServer(interaction.guild.id)) {
      interaction.reply({ content: '請通知管理員先執行`/serversetup`指令', flags: MessageFlags.Ephemeral })
      return
    }

    const admin = await servers.findAdminRole(interaction.guild.id)
    const date = new Date()
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hour}-${minute}`

    const thread = await channel.threads.create({
      name: `編號[${time}]`,
      autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
      type: ChannelType.PrivateThread,
      reason: `由 ${interaction.user.displayName} 建立檢舉用頻道`,
    })
    logTime()
    console.log(`討論串建立了 : ${interaction.guild.name} ${thread.name}\n檢舉人 : ${interaction.user.displayName} ${interaction.user.id}\n-----------------------`)

    await logChannel.send(`${time} ${interaction.user.toString()}(${interaction.user.id})\n投訴討論串<#${thread.id}>已建立`)
    await thread.members.add(interaction.member.user.id)
    await thread.send(`<@${interaction.member.user.id}>您好\n這個討論串只有您與<@&${admin}>看的見\n請將您要投訴的內容、訊息連結、截圖都貼在這個地方，會由管理員進行處置。\n**請務必注意若在此標註任何人，他將會被邀請進入此討論串。**`)
    await interaction.reply({ content: `投訴專用討論串<#${thread.id}>已建立，請放心的在該討論串進行投訴`, flags: MessageFlags.Ephemeral })
  },
}
