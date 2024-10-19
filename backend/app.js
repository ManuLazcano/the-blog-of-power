import express from 'express'
import cors from 'cors'

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
