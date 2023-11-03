const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    // Attach the decoded user ID to the request for use in your routes
    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
