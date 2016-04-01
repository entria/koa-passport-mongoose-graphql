'use strict';

import mongoose from 'mongoose-fill';
import validate from 'mongoose-validator';
import bcrypt from 'bcrypt-as-promised';
import * as provider from '../auth/config';
import ImageUser from './ImageUser';

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model('User', UserSchema);
