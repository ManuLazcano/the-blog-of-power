import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { publicationRouter } from './routes/publications.js'
import { userRouter } from './routes/users.js'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.use('/publication', publicationRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
