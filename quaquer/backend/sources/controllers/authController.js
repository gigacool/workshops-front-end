const { hash, compare } = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.json({ token: generateToken(user)});
  } 
  catch (error) {
    res.status(500).send(error.message);
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user){
      res.status(401).send('Invalid credentials');
      return;
    }

    if (!await compare(password, user.password)){
      res.status(401).send('Invalid credentials');
      return;
    }

    res.json({ token: generateToken(user) });
  } 
  catch (error) {
    res.status(500).send(error.message);
  }
}
