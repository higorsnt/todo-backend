const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async create(request, response) {
    const { name, email, password } = request.body;

    const user = await connection('users')
      .whereRaw("LOWER(email) = LOWER(?)", email)
      .first();
    
    if (user) {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return response.status(401).send();
        }

        const payload = { id: user.id };
        return response.json({
          name: user.name,
          email: user.email,
          token: jwt.sign(payload, process.env.AUTH_SECRET),
        });
      });
    } else {
      return response.status(400).send('Usuário não cadastrado!')
    }
  }
};