import type { MsgCreate } from '@/types/general'
import { WebhookClient } from 'discord.js'
import webhooks from './webhooks.config'

function hookMikenekoNormal(msg: MsgCreate) {
  const webhook = new WebhookClient({ url: webhooks.mikeneko.normal })
  webhook.send({
    content: /^[補—–\-]/.test(msg.content) ? `${msg.content}` : ` : ${msg.content}`,
    username: `${msg.author.tag}`,
    avatarURL: `${msg.author.avatarURL()}`,
  })
}

function hookMikenekoTc(msg: MsgCreate) {
  const webhook = new WebhookClient({ url: webhooks.mikeneko.tcMember })
  webhook.send({
    content: /^[補—–\-]/.test(msg.content) ? `${msg.content}` : ` : ${msg.content}`,
    username: `${msg.author.tag}`,
    avatarURL: `${msg.author.avatarURL()}`,
  })
}

function hookMikenekoYt(msg: MsgCreate) {
  const webhook = new WebhookClient({ url: webhooks.mikeneko.ytMember })
  webhook.send({
    content: /^[補—–\-]/.test(msg.content) ? `${msg.content}` : ` : ${msg.content}`,
    username: `${msg.author.tag}`,
    avatarURL: `${msg.author.avatarURL()}`,
  })
}

function hookMikenekoReport(msg: MsgCreate) {
  msg.author.send('已收到你的檢舉，管理員會盡速處理').catch(error => console.log(error))

  const webhook = new WebhookClient({ url: webhooks.mikeneko.report })
  webhook.send({
    content: `${msg.content}`,
    username: `${msg.author.tag}`,
    avatarURL: `${msg.author.avatarURL()}`,

  })

  if (msg.attachments.size > 0) {
    msg.attachments.forEach((a) => {
      webhook.send({
        content: a.url,
        username: `${msg.author.tag}`,
        avatarURL: `${msg.author.avatarURL()}`,
      })
    })
  }
}

function hookAmemiya(msg: MsgCreate) {
  const webhook = new WebhookClient({ url: webhooks.mikeneko.amemiya })
  webhook.send({
    content: /^[補—–\-]/.test(msg.content) ? `${msg.content}` : ` : ${msg.content}`,
    username: `${msg.author.tag}`,
    avatarURL: `${msg.author.avatarURL()}`,
  })
}

function hookYoruNormal(msg: MsgCreate) {
  const webhook = new WebhookClient({ url: webhooks.yoru.normal })
  webhook.send({
    content: /^[補—–\-]/.test(msg.content) ? `${msg.content}` : ` : ${msg.content}`,
    username: `${msg.author.tag}`,
    avatarURL: `${msg.author.avatarURL()}`,
  })
}

function hookYoruReport(msg: MsgCreate) {
  msg.author.send('已收到你的檢舉，管理員會盡速處理').catch(error => console.log(error))

  const webhook = new WebhookClient({ url: webhooks.yoru.report })
  webhook.send({
    content: `${msg.content}`,
    username: `${msg.author.tag}`,
    avatarURL: `${msg.author.avatarURL()}`,
  })

  if (msg.attachments.size > 0) {
    msg.attachments.forEach((a) => {
      webhook.send({
        content: a.url,
        username: `${msg.author.tag}`,
        avatarURL: `${msg.author.avatarURL()}`,
      })
    })
  }
}

const actions = new Map<string, (msg: MsgCreate) => void>([
  [webhooks.mikeneko.normalChannel, hookMikenekoNormal],
  [webhooks.mikeneko.tcChannel, hookMikenekoTc],
  [webhooks.mikeneko.ytChannel, hookMikenekoYt],
  [webhooks.mikeneko.reportChannel, hookMikenekoReport],
  [webhooks.mikeneko.amemiyaChannel, hookAmemiya],
  [webhooks.yoru.normalChannel, hookYoruNormal],
  [webhooks.yoru.reportChannel, hookYoruReport],
])

export default {
  execute: async (msg: MsgCreate) => {
    actions.get(msg.channelId)?.(msg)
  },
}
