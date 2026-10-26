import { serve } from '@hono/node-server'
import app from './app.js'

const port = 4000

serve({ fetch: app.fetch, port }, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
