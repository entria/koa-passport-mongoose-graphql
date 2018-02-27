import 'babel-polyfill';
import 'isomorphic-fetch';
import app from './server';
import { connectDatabase } from './server/db';
import { development, /* test , */production } from './server/db/config';

const port = process.env.PORT || 4000;
const databaseConfig = (process.env.NODE_ENV === 'production') ? production : development;

(async () => {
  try {
    const info = await connectDatabase(databaseConfig);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
  }

  await app.listen(port);
  console.log(`Server started on port ${port}`);
})();
