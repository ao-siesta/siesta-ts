import type { APIEmbed, Client } from 'discord.js'
import type { ChannelMessageObj } from '@/types/general'
import BotLog from '@/data/database/dbFunction/BotLog'

const botLog = new BotLog()

module.exports = {
  execute: async (oldMessage: ChannelMessageObj, newMessage: ChannelMessageObj, client: Client) => {
    if (!oldMessage.guildId) return
    if (oldMessage.channel.isDMBased()) return

    const channelId = await botLog.logChannelId(oldMessage.guildId)
    if (!channelId) return
    const logChannel = client.channels.cache.get(channelId)
    if (!logChannel || logChannel.isDMBased() || !logChannel.isTextBased()) return

    const embed: APIEmbed = {
      color: 0x68C3E7,
      title: `訊息編輯 #${oldMessage.channel.name}`,
      description: `${oldMessage.author.displayName}<@${oldMessage.author.id}>`,
      fields: [
        { name: '舊訊息', value: `${oldMessage.content || ('`nothing`')}`, inline: false },
        { name: '新訊息', value: `${newMessage.content}`, inline: false },
      ],
    }
    await logChannel.send({ embeds: [embed] })
  },
}
