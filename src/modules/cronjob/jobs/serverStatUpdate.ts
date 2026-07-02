import type { Client } from 'discord.js'
import Servers from '@/data/database/dbFunction/Servers'
import taskScheduler from '../task-scheduler'

async function updateServerStatDb(client: Client) {
  const servers = new Servers()
  const serverIds = await servers.allServerId()
  await client.guilds.fetch()
  Promise.allSettled(serverIds.map((id) => {
    const name = client.guilds.cache.get(id)?.name
    return name ? servers.updateServer(id, name) : Promise.resolve()
  }))
}

taskScheduler.addTask('daily', {
  name: 'Update server stat database',
  task: updateServerStatDb,
})
