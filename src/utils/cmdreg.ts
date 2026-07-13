import c from 'ansis'
import { REST, Routes } from 'discord.js'
import { cid, token } from '@/config.json'
import { CommandDictJSON, printCommandList } from '@/modules/commands'

const rest = new REST().setToken(token)
rest.put(Routes.applicationCommands(cid), { body: CommandDictJSON() })
  .then(() => {
    console.log(c.green.bold`Successfully registered application commands.\n`)
    printCommandList()
  })
  .catch(console.error)
