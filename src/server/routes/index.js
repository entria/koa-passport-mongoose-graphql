import compose from 'koa-compose';
import Router from 'koa-router';
import importDir from 'import-dir';

const routerConfigs = [{ folder: 'base', prefix: '' }, { folder: 'api', prefix: '/api' }];

export default function routes() {
  const composed = routerConfigs.reduce((prev, curr) => {
    const Routes = importDir(`./${curr.folder}`);
    const router = new Router({
      prefix: curr.prefix
    });

    Object.keys(Routes).map(name => Routes[name](router));

    return [router.routes(), router.allowedMethods(), ...prev];
  }, []);

  return compose(composed);
}
