const bcrypt = require('bcryptjs');

const generateHash = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
  });
};

module.exports = generateHash;