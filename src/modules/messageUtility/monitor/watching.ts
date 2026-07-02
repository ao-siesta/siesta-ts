import type { Client } from 'discord.js'
import type { MsgCreate } from '@/types/general'
import { ChannelType } from 'discord.js'
import config from '@/config.json'

export default {
  async execute(msg: MsgCreate, client: Client) {
    if (msg.author.id === config.oid) return

    const owner = await client.users.fetch(config.oid)
    if (!owner) return

    if (msg.channel.type === ChannelType.DM) {
      owner.send({
        embeds: [{
          color: 0xFFFFFF,
          title: `來自 ${msg.author.displayName} (${msg.author.id})的訊息`,
          description: `<@${msg.author.id}>\n${msg.content}`,
          footer: { text: `來信時間 : <t:${msg.createdTimestamp}>` },
        }],
      })
    } else if (msg.content.includes('蒼')) {
      if (config.ignore.some(s => msg.content.includes(s))) return

      owner.send({
        embeds: [{
          color: 0x68C3E7,
          title: `${msg.author.displayName}(${msg.author.id}) 在 #${msg.channel.name} 提及了蒼`,
          description: `<#${msg.channelId}> <@${msg.author.id}>\n${msg.content}`,
        }],
      })
    }
  },
}
