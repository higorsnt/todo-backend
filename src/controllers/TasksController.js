const moment = require('moment');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const date = request.query.date ?
      request.query.date :
      moment().endOf('day').toDate();

    try {
      const tasks = await connection('tasks')
        .where({ userId: request.user.id })
        .where('estimateAt', '<=', date)
        .orderBy('estimateAt');

      return response.json(tasks);
    } catch (error) {
      return response.status(500).send();
    }
  },

  async create(request, response) {
    request.body.userId = request.user.id;
    try {
      await connection('tasks').insert(request.body);
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json(error);
    }
  },

  async delete(request, response) {
    try {
      const rows = await connection('tasks')
        .where({ id: request.params.id, userId: request.user.id })
        .del();
      
      if (rows > 0) {
        return response.status(204).send();
      } else {
        let msg = `Não foi encontrada nenhuma tasks com id ${req.params.id}`;
        return response.status(400).send(msg);
      }
    } catch (error) {
      return response.status(400).json(error);
    }
  },

  async update(request, response) {
    try {
      const task = await connection('tasks')
        .where({ id: request.params.id, userId: request.user.id })
        .first();
      
      if (!task) {
        const msg = `Task com id ${request.user.id} não encontrada.`;
        return response.status(400).send(msg);
      }

      const doneAt = task.doneAt ? null: new Date();

      await connection('tasks')
        .where({ id: request.params.id, userId: request.user.id })
        .update({ doneAt });
      
      return response.status(204).send();
    } catch (error) {
      return response.status(400).json(error);
    }
  }
};