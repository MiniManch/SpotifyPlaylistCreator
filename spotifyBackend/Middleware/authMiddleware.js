const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const [bearer, token] = authHeader.split(' '); // Split the header into 'Bearer' and the token

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = decodedToken; // Set the user object in the request
    next();
  });
};

module.exports = requireAuth;
