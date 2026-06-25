import type { BaseMessageOptions, ChatInputCommandInteraction } from 'discord.js'
import type { ChannelMessageObj } from '@/types/general'
import { PermissionFlagsBits } from 'discord.js'
import randomFn from 'random'
import config from '@/config.json'

export function isAdmin(interaction: ChatInputCommandInteraction) {
  return (interaction.user.id === config.oid || interaction.memberPermissions?.has(PermissionFlagsBits.Administrator, true))
}

export function isOwner(id: string) {
  return id === config.oid
}

export function omikuji(msg: ChannelMessageObj) {
  interface OmikujiResult {
    color: number
    image: string
  }

  const random = randomFn.int(0, 14)
  const author = msg.author.displayName
  const result = new Map<string, OmikujiResult>([
    ['daikichi', {
      color: 0xC8A9D6,
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972567111401482/omikuji_daikichi.png',
    }],
    ['syoukichi', {
      color: 0xC8A9D6,
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972567560216576/omikuji_syoukichi.png',
    }],
    ['kichi', {
      color: 0xC8A9D6,
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972567967068200/omikuji_kichi.png',
    }],
    ['suekichi', {
      color: 0xC8A9D6,
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972569137270794/omikuji_suekichi.png',
    }],
    ['chuukichii', {
      color: 0xC8A9D6,
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972568684298290/omikuji_chuukichi.png',
    }],
    ['kyou', {
      color: 0xC8A9D6,
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972568357122108/omikuji_kyou.png',
    }],
    ['daikyou', {
      color: 0xC8A9D6,
      image: 'https://media.discordapp.net/attachments/867034103097196544/928972569556680755/omikuji_daikyou.png',
    }],
  ])

  function getFormatOmikujiResult(result: OmikujiResult, author: string): BaseMessageOptions {
    return {
      embeds: [{
        color: result.color,
        title: `**${author} 的抽籤結果**`,
        image: {
          url: result.image,
        },
      }],
    }
  }

  switch (random) {
    case 0:
    case 1:
    case 2:
      return getFormatOmikujiResult(result.get('daikichi')!, author)
      break
    case 3:
    case 4:
      return getFormatOmikujiResult(result.get('syoukichi')!, author)
      break
    case 5:
    case 6:
    case 7:
      return getFormatOmikujiResult(result.get('kichi')!, author)
      break
    case 8:
    case 9:
      return getFormatOmikujiResult(result.get('suekichi')!, author)
      break
    case 10:
    case 11:
      return getFormatOmikujiResult(result.get('chuukichii')!, author)
      break
    case 12:
    case 13:
      return getFormatOmikujiResult(result.get('kyou')!, author)
      break
    case 14:
      return getFormatOmikujiResult(result.get('daikyou')!, author)
      break
  }
}

export function flipCoin(author: ChannelMessageObj['author'], multiple = false) {
  const output = []
  const count = multiple ? randomFn.int(3, 8) : 1
  let haveMiddle = false
  for (let i = 0; i < count; i++) {
    let resultImage = ''
    let resultTxt = ''
    if (randomFn.int(0, 100) === 50) {
      resultTxt = '硬幣立起來了！'
      resultImage = 'https://cdn.discordapp.com/attachments/966618791276605470/1329104198662619166/coin-side.png'
      haveMiddle = true
    } else if (randomFn.boolean()) {
      resultTxt = '正面'
      resultImage = 'https://cdn.discordapp.com/attachments/966618791276605470/1329104198931058748/coin-upside.png'
    } else {
      resultTxt = '反面'
      resultImage = 'https://cdn.discordapp.com/attachments/966618791276605470/1329104199195168921/coin-downside.png'
    }

    output.push({
      color: 0xA5A9B4,
      title: multiple ? `硬幣${i + 1}哪邊向上了？` : `${author.displayName} 的擲硬幣結果`,
      description: resultTxt,
      thumbnail: { url: resultImage },
    })
  }

  let content = multiple ? `<@${author.id}> 撒出了${count}枚硬幣！` : ''
  if (haveMiddle) content += '竟然擲到了中間，這真的是太牛逼了，該請客了！'

  return { content, embeds: output }
}

export function logTime() {
  const now = new Date()
  console.log(now.toTimeString())
}

export function helpMeSelect(items: string[]): string {
  if (items.length <= 1) return '蛤？抽什麼？'
  if (randomFn.int(0, 100) === 50) return randomFn.boolean() ? '小孩子才做選擇，全都要！' : '都不要'
  return `就這個吧：${randomFn.choice(items)}`
}
