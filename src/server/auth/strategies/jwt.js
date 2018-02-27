import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../../models/User';
import { auth } from '../config';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: auth.secret,
};

export default new JWTStrategy(opts, async (jwtPayload, done) => {
  const user = await User.findById(jwtPayload.id);
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});
