import express from 'express'
import cors from 'cors'
import { publicationRouter } from './routes/publications.js'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.use('/publication', publicationRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
