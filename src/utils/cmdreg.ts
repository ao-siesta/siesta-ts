import c from 'ansis'
import { REST, Routes } from 'discord.js'
import { cid, token } from '@/config.json'
import CommandRegistry from '@/modules/commands/CommandRegistry'

import '@/modules/commands/index'

const rest = new REST().setToken(token)
rest.put(Routes.applicationCommands(cid), { body: CommandRegistry.toAPIBody() })
  .then(() => {
    console.log(c.green.bold`Successfully registered application commands.\n`)
    CommandRegistry.print()
  })
  .catch(console.error)
