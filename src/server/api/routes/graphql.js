/**
 * Created by sibelius on 05/04/16.
 */
import { graphql } from 'graphql';
import { renderGraphiQL } from '../../graphql/util';
import { schema, graphiql } from '../../graphql';

function accepts(ctx, type) {
  return ctx.headers && ctx.headers.accept && ctx.headers.accept.includes(type);
}

export default (router) => {
  router
    .get('/graphql',
      async ctx => {
        const body = ctx.request.body;
        const { query, variables } = Object.assign({}, body, ctx.query);

        if (accepts(ctx, 'html') && graphiql) {
          ctx.body = renderGraphiQL({ query, variables });
        } else if (query && query.includes('mutation')) {
          ctx.status = 406;
          ctx.body = 'GraphQL mutation only allowed in POST request.';
        }
      }
    )
    .post('/graphql',
      async ctx => {
        const body = ctx.request.body;
        const { query, variables } = Object.assign({}, body, ctx.query);

        ctx.body = await graphql(schema, query, ctx, variables);
      }
    );
};