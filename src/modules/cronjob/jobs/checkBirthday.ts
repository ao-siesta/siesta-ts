import type { Client, GuildMember } from 'discord.js'
import path from 'node:path'
import Canvas from '@napi-rs/canvas'
import { AttachmentBuilder } from 'discord.js'
import { BDrole, miaomi, miaomiCh, oid } from '@/config.json'
import Birthday from '@/data/database/dbFunction/Birthday'
import taskScheduler from '../task-scheduler'

/**
 * The birthday tasks for miaomi180 group
 * @param client - The Discord.js client instance
 */
export async function handleMiaomiBdTasks(client: Client) {
  const birthday = new Birthday()
  const miaomiGuild = await client.guilds.fetch(miaomi)
  const miaomiMember = await miaomiGuild.members.fetch()
  const channel180 = await client.channels.fetch(miaomiCh)
  const owner = await client.users.fetch(oid)

  if (!channel180?.isSendable()) return

  // 刪除身份組
  await Promise.all(
    miaomiMember
      .filter(member => member.roles.cache.some(role => role.id === BDrole))
      .map(member => member.roles.remove(BDrole)
        .catch(() => {
          if (owner) owner.send('生日身份出問題')
        })),
  )

  // 加入身份組
  const bd = await birthday.birthdayTodayRaw()
  if (bd.length === 0) return

  await miaomiGuild.roles.fetch()
  const role = miaomiGuild.roles.cache.find(role => role.id === BDrole)
  if (!role) return

  const msg: string[] = []
  const validMembers: GuildMember[] = bd.map(d => miaomiMember.get(d.user_id)).filter(m => !!m)
  const pics = await Promise.all(validMembers.map(async (member) => {
    msg.push(`:tada: ${member.toString()} :tada:`)
    member.roles.add(role).catch(console.error)
    return getBdNoticePic(member)
  }))

  channel180.send({
    embeds: [{
      color: 0xFAD241,
      title: '今日壽星',
      description: `${msg.join('\n')}\n生日快樂:partying_face:`,
    }],
    files: pics,
  })
}

async function showRecentBd(client: Client) {
  const channels = client.channels
  const channel180 = channels.cache.get(miaomiCh)
  if (!channel180?.isSendable()) return

  const birthday = new Birthday()
  channel180.send({
    embeds: [{
      color: 0xFFFFFF,
      title: '這3個月內生日的人：',
      description: await birthday.birthdayRecent(),
    }],
  })
}

async function announceMiaomiBd(client: Client) {
  const channels = client.channels
  const channel180 = channels.cache.get(miaomiCh)
  if (!channel180?.isSendable()) return

  channel180.send({
    content: [
      '# 大家請注意！今天是我們的IQ180群主<@730621367333945354>的生日！',
      '# 請大家祝她生日大快樂😁',
    ].join('\n'),
    files: [{
      attachment: path.join(__dirname, '../../../assets/images/miaomi_bd.jpg'),
    }],
  })
}

taskScheduler.addTask('daily', {
  name: 'Miaomi180 birdthday tasks',
  task: handleMiaomiBdTasks,
})

taskScheduler.addTask('month', {
  name: 'Miaomi180 monthly announce birthday',
  task: showRecentBd,
})

taskScheduler.addTask('other', {
  name: 'Announce 5/5 Miaomi birthday',
  period: '0 0 5 5 *',
  task: announceMiaomiBd,
})

export async function getBdNoticePic(member: GuildMember) {
  const canvas = Canvas.createCanvas(960, 592)
  const context = canvas.getContext('2d')

  const background = await Canvas.loadImage(path.join(__dirname, '../../../assets/images/bd_notice.jpg'))
  const avatar = await Canvas.loadImage(member.displayAvatarURL())
  const hat = await Canvas.loadImage(path.join(__dirname, '../../../assets/images/party_hat.png'))

  context.drawImage(background, 0, 0, canvas.width, canvas.height)

  context.save()
  context.beginPath()
  context.arc(290 + 190, 67 + 190, 190, 0, Math.PI * 2, true)
  context.closePath()
  context.clip()
  context.drawImage(avatar, 290, 67, 380, 380)
  context.restore()

  context.drawImage(hat, 223, 31, 160, 152)

  const attachment = new AttachmentBuilder(await canvas.encode('jpeg'), { name: `bd-card-${member.id}.jpg` })
  return attachment
}
