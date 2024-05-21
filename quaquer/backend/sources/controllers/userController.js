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
      username: user.username
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
