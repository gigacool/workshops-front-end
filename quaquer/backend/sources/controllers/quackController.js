const Quack = require('../models/quack');

// Create a new quack
exports.createquack = async (req, res) => {
  try {
    const quack = new Quack({
      content: req.body.content,
      author:  req.user.id // assuming req.user is set by the auth middleware
    });
    await quack.save();
    res.status(201).json(quack);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all quacks
exports.getAllquacks = async (req, res) => {
  try {
    const quacks = await Quack.find().populate('author', 'username').sort({ createdAt: -1 });
    
    res.status(200).json(
      quacks.map((quack) =>(
        {
        key:quack._id,
        content: quack.content,
        author: {
          username:quack.author.username
        },
        likes: quack.likes.length,
        createdAt: quack.createdAt
        }

      ))
    );
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
};


exports.likeQuack = async (req, res) => {
  try {
    const { quackId } = req.params;
    const userId = req.user.id; 

    const quack = await Quack.findById(quackId);
    if (!quack) {
      return res.status(404).json({ message: 'Quack not found' });
    }

    // toggle the like
    const position = quack.likes.indexOf(userId);
    if (position >= 0){
      quack.likes.splice(position, 1);
    } else {
      quack.likes.push(userId);
    }
    await quack.save();

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: 'Could not like' });
  }
};

// Get quacks by a specific user
exports.getUserquacks = async (req, res) => {
  try {
    const quacks = await Quack.find({ author: req.params.userId }).populate('author', 'username').sort({ createdAt: -1 });
    res.status(200).json(quacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a quack
exports.deletequack = async (req, res) => {
  try {
    const quack = await Quack.findById(req.params.quackId);
    if (!quack) {
      return res.status(404).json({ error: 'quack not found' });
    }
    if (quack.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    await quack.remove();
    res.status(200).json({ message: 'quack deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
