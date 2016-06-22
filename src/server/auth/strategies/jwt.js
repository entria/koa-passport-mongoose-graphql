'use strict';

import User from '../../models/User';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { auth } from '../config';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: auth.secret,
};

export default new JWTStrategy(opts, async (jwt_payload, done) => {
  const user = await User.findById( jwt_payload.id );
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});
