import type { APIEmbed, Client } from 'discord.js'
import type { ChannelMessageObj } from '@/types/general'
import { Buffer } from 'node:buffer'
import axios from 'axios'
import { AttachmentBuilder } from 'discord.js'
import BotLog from '@/data/database/dbFunction/BotLog'

const botLog = new BotLog()

module.exports = {
  execute: async (msg: ChannelMessageObj, client: Client) => {
    if (!msg.guildId) return
    if (msg.channel.isDMBased()) return

    const channelId = await botLog.logChannelId(msg.guildId)
    if (!channelId) return
    const logChannel = client.channels.cache.get(channelId)
    if (!logChannel || logChannel.isDMBased() || !logChannel.isTextBased()) return

    const embed: APIEmbed = {
      color: 0xFFFFFF,
      title: '',
      description: `${msg.author.displayName}<@${msg.author.id}>`,
    }

    const files: AttachmentBuilder[] = []
    if (msg.attachments.size > 0) {
      embed.title = `附件刪除 #${msg.channel.name}`
      await Promise.allSettled(msg.attachments.map(async (a) => {
        const url = a.url
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        const buff = Buffer.from(response.data, 'base64')
        files.push(new AttachmentBuilder(buff, { name: a.name }))
      }))
    } else {
      embed.title = `訊息刪除 #${msg.channel.name}`
    }

    if (msg.content) {
      embed.fields = [{
        name: '訊息內容',
        value: `${msg.content}`,
        inline: false,
      }]
    }

    await logChannel.send({ files, embeds: [embed] })
  },
}
