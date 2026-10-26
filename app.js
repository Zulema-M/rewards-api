import { Hono } from 'hono'
import rewardsRouter from './rewards/router.js'

const app = new Hono()

app.route('/', rewardsRouter)

export default app
