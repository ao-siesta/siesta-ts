import type { Command } from '@/types/discord'
import c from 'ansis'
import { Collection } from 'discord.js'

class CommandRegistry extends Collection<string, Command> {
  toAPIBody() {
    return this.map(cmd => cmd.data.toJSON())
  }

  print() {
    console.log(c.yellow.bold`List of commands:`)
    this.toAPIBody().forEach(cmd => console.log(`${c.cyan`- ${cmd.name}`}: ${cmd.description}`))
  }
}

const registry = new CommandRegistry()
export default registry
