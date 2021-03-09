  
import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import Syncbot from './Sync'

createConnection().then(async (connection) => {
  const syncbot = new Syncbot()
  await syncbot.syncStocks()
  // await syncbot.registerAssets()
  connection.close()
})