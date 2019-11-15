const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const token = req.header.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || 'Let me tell you a myth about secrets...';

    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }

};
