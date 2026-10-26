const DB_URL = 'https://formulario-26610-default-rtdb.firebaseio.com/rewards'
const findRewardByUser = async (userId) => {
  const res = await fetch(`${DB_URL}.json`)
  const data = await res.json()

  const entry = Object.entries(data ?? {})
    .find(([, reward]) => String(reward.userId) === String(userId))

  return entry ? { id: entry[0], ...entry[1] } : null
}

export const createReward = async (c) => {
  const { userId, points } = await c.req.json()

  if (userId === undefined || points === undefined) {
    return c.json({ error: 'userId y points son requeridos' }, 400)
  }

  const existing = await findRewardByUser(userId)

  if (existing) {
    const total = Number(existing.points) + Number(points)

    await fetch(`${DB_URL}/${existing.id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, points: total })
    })

    return c.json({ id: existing.id, userId, points: total })
  }

  const res = await fetch(`${DB_URL}.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, points })
  })
  const data = await res.json()

  return c.json({ id: data.name, userId, points }, 201)
}

export const getRewardById = async (c) => {
  const reward = await findRewardByUser(c.req.param('id'))

  if (!reward) {
    return c.json({ error: 'Reward no encontrado para este usuario' }, 404)
  }

  return c.json(reward)
}
