const { hash, compare } = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');
const { generateGUID } = require('../utils/utils');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, username, password, birthDate } = req.body;
    const hashedPassword = await hash(password, 10);
    const identifier = generateGUID();
    const user = new User({ 
      birthDate,
      firstName,
      lastName,
      username,
      identifier, 
      password: hashedPassword 
    });
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
    console.log('login', username, password);
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
