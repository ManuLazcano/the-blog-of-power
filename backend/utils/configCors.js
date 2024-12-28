const allowedOrigins = [
  process.env.PRODUCTION_URL,
  process.env.DEVELOPMENT_URL,
  process.env.FIX_URL
].filter(Boolean) // Filter undefined or empty values

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}

export { corsOptions }
