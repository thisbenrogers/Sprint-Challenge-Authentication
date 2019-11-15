const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');
const Token = require('./auth-helpers.js');
const { validateUser } = require('../users/user-helpers.js');

router.post('/register', (req, res) => {
  // implement registration

  let user = req.body;

  const validateResult = validateUser(user);

  if (validateResult.isSuccessful === true) {
    
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    const token = Token.getJwt(user.username);

    Users.add(user)
      .then(saved => {
        res.status(201).json({ saved: saved, token: token });
      })
      .catch(error => {
        res.status(500).json(error);
      })

  } else {

    res.status(400).json({
      message: 'Invalid user info, see errors',
      errors: validateResult.errors
    });
  }
});

router.post('/login', (req, res) => {
  // implement login
    
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {

      if (user && bcrypt.compareSync(password, user.password)) {
        
        const token = Token.getJwt(user.username);

        res.status(200).json({
          message: `Welcome ${user.username}! Have a token:`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
