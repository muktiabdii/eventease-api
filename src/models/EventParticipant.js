const knex = require('../config/db');

const EventParticipant = {
  
  async join(user_id, event_id) {
    return knex('event_participants').insert({ user_id, event_id });
  },

  async leave(user_id, event_id) {
    return knex('event_participants').where({ user_id, event_id }).del();
  },

  async findByUserAndEvent(user_id, event_id) {
    return knex('event_participants').where({ user_id, event_id }).first();
  },


  async countByEventId(event_id) {
    const result = await knex('event_participants')
      .where({ event_id })
      .count('id as participant_count')
      .first();
    return result.participant_count;
  },

  async findEventsByUserId(user_id) {
    return knex('event_participants')
      .select('events.*')
      .join('events', 'event_participants.event_id', 'events.id')
      .where('event_participants.user_id', user_id);
  },

  async findUsersByEventId(event_id) {
    return knex('event_participants')
      .select('users.id', 'users.name', 'users.profile_picture')
      .join('users', 'event_participants.user_id', 'users.id')
      .where('event_participants.event_id', event_id);
  },
};

module.exports = EventParticipant;