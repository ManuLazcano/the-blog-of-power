import jwt from 'jsonwebtoken'

export const optionalAuthenticateToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    req.user = null
    return next()
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.user = decoded
  } catch (err) {
    req.user = null
  }
  next()
}
