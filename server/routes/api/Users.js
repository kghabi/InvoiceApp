const express = require('express');
const router = express.Router();
const { Users } = require('../../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

// Registration user
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      res.json('registered successfully');
    });
  } else {
    res.json('Username Already exist !');
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: 'Wrong username And Password Combination' });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          'importantsecret'
        );
        res.json(accessToken);
      }
    });
  }
});

router.delete('/', async (req, res) => {
  try {
    const users = await Users.findAll();
    if (!users == users) {
      return res.status(404).json({ msg: 'Users not found' });
    }
    await Users.destroy({
      where: {},
    });

    res.json({ msg: 'Users removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Users not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
