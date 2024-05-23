const User = require('../models/user');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ username:userId });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json({
      isSelf: req.user.id == user._id.toString() ? true:undefined,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      birthDate: user.birthDate
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getAuthentifiedProfile = async (req, res) => {
  try {
    console.log('here', req.user.id);
    const userId = req.user.id;
    const user = await User.findOne({ _id:userId });
    if (!user) {
      return res.status(401).send();
    }
    res.json({
      isSelf: req.user.id == user._id.toString() ? true:undefined,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      birthDate: user.birthDate
    });

  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
}