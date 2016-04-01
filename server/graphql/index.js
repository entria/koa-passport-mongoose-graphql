import { getSchema } from '@risingstack/graffiti-mongoose';
import graffiti from '@risingstack/graffiti';
import Models from '../models';
import compose from 'koa-compose';
import convert from 'koa-convert';

export const schema = getSchema(Models);
export const graphiql = true;

export default function graphql() {
  console.log('graphql init');

  return compose([
      convert(graffiti.koa({
        schema,
        graphiql,
      })),
    ]);
}