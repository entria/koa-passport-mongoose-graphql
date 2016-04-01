'use strict';

import User from '../../models/User';
import { isAuthenticated } from '../../auth';

export default (router) => {
  router
    //Get user data from server using token
    .get('/user/me', isAuthenticated(), async ctx => {
      const user = await User.findById(ctx.session.passport.user);
      if (user) ctx.body = user;
    })

};
