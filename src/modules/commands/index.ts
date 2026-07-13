import type { Command } from '@/types/discord'
import c from 'ansis'
import { Collection } from 'discord.js'

import birthday from './birthday'
import blacklist from './blacklist'
import botzone from './botzone'
import characters from './characters'
import clearrole from './clearrole'
import funhelp from './funhelp'
import inrole from './inrole'
import invite from './invite'
import kickrole from './kickrole'
import listbot from './listbot'
import listservers from './listservers'
import logchannel from './logchannel'
import ping from './ping'
import report from './report'
import say from './say'
import serversetup from './serversetup'
import serverstats from './serverstats'
import stats from './stats'
import user from './user'
import version from './version'

export const CommandDict = new Collection<string, Command>([
  [birthday.data.name, birthday],
  [blacklist.data.name, blacklist],
  [botzone.data.name, botzone],
  [characters.data.name, characters],
  [clearrole.data.name, clearrole],
  [funhelp.data.name, funhelp],
  [inrole.data.name, inrole],
  [invite.data.name, invite],
  [kickrole.data.name, kickrole],
  [listbot.data.name, listbot],
  [listservers.data.name, listservers],
  [logchannel.data.name, logchannel],
  [ping.data.name, ping],
  [report.data.name, report],
  [say.data.name, say],
  [serversetup.data.name, serversetup],
  [serverstats.data.name, serverstats],
  [stats.data.name, stats],
  [user.data.name, user],
  [version.data.name, version],
])
export const CommandRegistry = new Collection<string, Command>()

export const CommandDictJSON = () => CommandDict.map(cmd => cmd.data.toJSON())

export function printCommandList() {
  console.log(c.yellow.bold`List of commands:`)
  CommandDictJSON().forEach(cmd => console.log(`${c.cyan`- ${cmd.name}`}: ${cmd.description}`))
}
