const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {console.log(same);
      
        if (same) {
          // USER SESSION
          res.status(200).send('YOU ARE LOGGED IN');
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
