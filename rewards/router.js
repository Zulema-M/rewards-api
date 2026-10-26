import { Hono } from 'hono'
import { createReward, getRewardById } from './controller.js'

const router = new Hono()

router.post('/rewards', createReward)
router.get('/users/:id/reward', getRewardById)

export default router
