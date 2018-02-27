import passport from 'koa-passport';
import compose from 'koa-compose';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { auth as config } from './config';

// Strategies
import jwtStrategy from './strategies/jwt';
import emailStrategy from './strategies/email';

passport.use('jwt', jwtStrategy);
passport.use('email', emailStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  (async () => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  })();
});

export default function auth() {
  return compose([
    passport.initialize(),
  ]);
}

export function isAuthenticated() {
  return passport.authenticate('jwt');
}

export function authEmail() {
  return passport.authenticate('email');
}

// After autentication using one of the strategies, generate a JWT token
export function generateToken() {
  return async ctx => {
    const { user } = ctx.passport;
    if (user === false) {
      ctx.status = 401;
    } else {
      const jwtToken = jwt.sign({ id: user }, config.secret);
      const token = `JWT ${jwtToken}`;

      const currentUser = await User.findOne({ _id: user });

      ctx.status = 200;
      ctx.body = {
        token,
        user: currentUser,
      };
    }
  };
}

// Web Facebook Authentication
export function isFacebookAuthenticated() {
  return passport.authenticate('facebook', {
    scope: ['email'],
  });
}

export function isFacebookAuthenticatedCallback() {
  return passport.authenticate('facebook', {
    failureRedirect: '/login',
  });
}
