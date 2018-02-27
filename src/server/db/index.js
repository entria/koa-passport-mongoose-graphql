import mongoose from 'mongoose';

export default (uri) => new Promise((resolve, reject) => {
  mongoose.connection
    .on('error', error => reject(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => resolve(mongoose.connections[0]));

  mongoose.connect(uri);
});
