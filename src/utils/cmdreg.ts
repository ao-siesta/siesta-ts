import fs from 'node:fs'
import path from 'node:path'
import c from 'ansis'
import { REST, Routes } from 'discord.js'
import { cid, token } from '@/config.json'
import { dirname } from '@/utils/general'

const cmdDir = path.join(dirname, '../modules/commands/')
const commandFiles = fs.readdirSync(cmdDir).filter(file => /\.[cm]?[tj]sx?$/i.test(file))

;(async () => {
  const commands = (await Promise.all(commandFiles.map(async (f) => {
    return import(path.join(cmdDir, f))
  }))).map(c => c.default.data.toJSON())

  const rest = new REST().setToken(token)
  rest.put(Routes.applicationCommands(cid), { body: commands })
    .then(() => {
      console.log(c.green.bold`Successfully registered application commands.\n`)
      console.log(c.cyan`List of commands:`)
      commands.forEach(cmd => console.log(`${c.cyan`-`} ${c.yellow(cmd.name)}: ${cmd.description}`))
    })
    .catch(console.error)
})()
