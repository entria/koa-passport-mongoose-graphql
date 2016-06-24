'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';
import importDir from 'import-dir';

const routerPrefixes = [{ folder: 'base', prefix: '' }, { folder: 'api', prefix: '/api' }]

export default function routes() {
  let routeConfig = [];
  routerPrefixes.map(config => {
    const routes = importDir('./' + config.folder);
    const router = new Router({
      prefix: config.prefix
    });

    Object.keys(routes).map(name => routes[name](router));

    routeConfig = [router.routes(), router.allowedMethods(), ...routeConfig];
  })

  return compose(routeConfig);
}
