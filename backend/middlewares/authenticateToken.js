import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' })
  }
}
