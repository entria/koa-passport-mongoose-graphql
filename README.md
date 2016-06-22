# Koa 2 + Passport + Mongoose + GraphQL

[![Build Status](https://travis-ci.org/sibelius/koa-passport-mongoose-graphql.svg?branch=master)](https://travis-ci.org/sibelius/koa-passport-mongoose-graphql)

## Command

#### Setup
```bash
npm install
```
#### Develop
```bash
# using nodemon
npm start

# using babel-watch
npm run watch
```

#### Test
```bash
npm test
```


## Dependencies

- Watcher and hot-reload: [nodemon](http://nodemon.io/)
- Test:
    + [mocha](https://mochajs.org/)
    + [should](https://github.com/shouldjs/should.js)
    + [supertest](https://github.com/visionmedia/supertest)
- Build: [babel](http://babeljs.io/)
    + tools: babel-register
    + presets: babel-preset-es2015-node5
    + plugins: transform-async-to-generator, syntax-async-functions
- *Lint*:
    You can choose the lint tool that you prefer.

## Reference

- [koajs/koa#533](https://github.com/koajs/koa/issues/533)
- [koajs/koa#596](https://github.com/koajs/koa/issues/596)
