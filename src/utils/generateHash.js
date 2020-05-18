const bcrypt = require('bcryptjs');

const generateHash = (password, callback) => {
  let salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  callback(hash);
};

module.exports = generateHash;