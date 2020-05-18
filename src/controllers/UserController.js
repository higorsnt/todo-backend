const connection = require('../database/connection');
const generateHash = require('../utils/generateHash');

module.exports = {
  create(request, response) {
    const { name, email, password } = request.body;
    
    generateHash(password, async (hash) => {
      const password = hash;
      
      try {
        await connection('users').insert({
          name,
          email,
          password
        });
      } catch (error) {
        return response.status(500).json(error);
      }

      return response.status(204).send();
    });
  }
};