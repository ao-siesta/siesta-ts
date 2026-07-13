import type { Command } from '@/types/discord'
import c from 'ansis'
import { Collection } from 'discord.js'

export const CommandRegistry = new Collection<string, Command>()

export const CommandDictJSON = () => CommandRegistry.map(cmd => cmd.data.toJSON())

export function printCommandList() {
  console.log(c.yellow.bold`List of commands:`)
  CommandDictJSON().forEach(cmd => console.log(`${c.cyan`- ${cmd.name}`}: ${cmd.description}`))
}
