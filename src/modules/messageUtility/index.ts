/* eslint-disable style/brace-style */
import type { ChannelMessageObj } from '@/types/general'
import randomFn from 'random'
import config from '@/config.json'
import Botzone from '@/data/database/dbFunction/BotChannel'
import { checkItem, eatDrinkWhat, getMenuStat, isAskingMeal, isCheckingMenu, testMenuOutput } from './menu/'
import { flipCoin, helpMeSelect, isOwner, omikuji } from './utility'

const botZone = new Botzone()

export default {
  execute: async (msg: ChannelMessageObj) => {
    const isOwnerUser = isOwner(msg.author.id)
    const isRightChannel = await botZone.findChannel(msg.channelId)

    if (msg.content === '菜單機率' && (isRightChannel || isOwnerUser)) {
      msg.reply(getMenuStat())
    }
    else if (msg.content.includes('機率') && (isRightChannel || isOwnerUser)) {
      const num = randomFn.int(0, 100)
      msg.channel.send(`${num}%`)
    }
    else if (msg.content.includes('抽籤') && isRightChannel) {
      msg.reply(omikuji(msg) ?? '大吉，我說你是就是')
    }
    else if ((msg.content.startsWith('隨機 ') || msg.content.startsWith('抽一個 ')) && isRightChannel) {
      const items = msg.content.replace(/\s+/g, ' ').trim().split(' ').slice(1)
      msg.reply(helpMeSelect(items))
    }
    else if (msg.content.replace(' ', '') === `<@${config.cid}>我婆`) {
      msg.reply(isOwnerUser ? '沒錯♥' : '婆你個大頭 醒')
    }
    else if (msg.content.replace(' ', '') === `<@${config.cid}>老婆`) {
      msg.reply(isOwnerUser ? '怎麼了♥' : '<:miaomi_yue:1513049019671121920>')
    }
    else if (msg.content.includes('擲幣') && isRightChannel) {
      msg.reply(flipCoin(msg.author))
    }
    else if (msg.content === '撒幣' && isRightChannel) {
      msg.reply(flipCoin(msg.author, true))
    }
    else if (isAskingMeal(msg.content) && !msg.author.bot && isRightChannel) {
      msg.reply(eatDrinkWhat(msg.content) ?? '累了，你自己想吧')
    }
    else if (isCheckingMenu(msg.content) && (isRightChannel || isOwnerUser)) {
      msg.reply(checkItem(msg.content))
    }
    else if (msg.content === '菜單測試' && isOwnerUser) {
      msg.reply(testMenuOutput())
    }
  },
}
