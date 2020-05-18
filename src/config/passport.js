const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;
const connection = require('../database/connection');

const params = {
  secretOrKey: process.env.AUTH_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new Strategy(params, async (payload, done) => {
  try {
    const user = await connection('users').where({ id: payload.id }).first();
    if (user) {
      done(null, { id: user.id, email: user.email });
    } else {
      done(null, false);
    }
  } catch (error) {
    done(err, false);
  }
});

passport.use(strategy);

module.exports = {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate('jwt', { session: false }),
};