const knex = require('../config/db');

const User = {
  async findByEmail(email) {
    return knex('users').where({ email }).first();
  },

  async findById(id) {
    return knex('users').where({ id }).first();
  },

  async createUser({ name, email, password, profile_picture }) {
    const [id] = await knex('users').insert({
      name,
      email,
      password,
      profile_picture: profile_picture || null,
    });
    return this.findById(id);
  },
};

module.exports = User;
