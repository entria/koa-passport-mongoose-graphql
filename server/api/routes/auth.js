'use strict';

import {
  authEmail,
  generateToken,
} from '../../auth';
import { ERROR, OK } from '../../consts';
import User from '../../models/User';

export default (router) => {
  router
    .post('/auth/email',
      authEmail(),
      generateToken());

  router
    .post('/auth/register',
      register,
      generateToken(),
  );
};

async function register(ctx, next) {
  const { name, email, password } = ctx.request.body;

  // TODO - improve validation
  if (name && email && password) {
    let user = await User.findOne({email});

    if (!user) {
      user = new User({
        name,
        email,
      });

      // TODO handle password

      await user.save();

      ctx.session.passport = {
        user: user._id,
      };

      await next();

    } else {
      ctx.status = 400;
      ctx.body = { status: 'error', message: 'E-mail already registered'};
    }
  } else {
    ctx.status = 400;
    ctx.body = { status: 'error', message: 'Invalid email or password'};
  }
}