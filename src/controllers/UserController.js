const connection = require('../database/connection');
const generateHash = require('../utils/generateHash');

module.exports = {
  create(request, response) {
    const { name, email, password } = request.body;
    generateHash(password, async (hash) => {
      const password = hash;
      
      try {
        await connection.insert({
          name,
          email,
          password
        });
      } catch (error) {
        return response.status(400).json(error);
      }

      return res.status(204).send();
    });
  }
};