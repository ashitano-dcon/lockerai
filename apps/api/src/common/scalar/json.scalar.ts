import { Scalar } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

type ValueNode = Parameters<typeof GraphQLJSON.parseLiteral>[0];

@Scalar('JSON')
export class JSONScalar {
  description = 'JSONスカラー型。任意のJSONデータを扱えます。';

  parseValue(value: unknown) {
    return GraphQLJSON.parseValue(value);
  }

  serialize(value: unknown) {
    return GraphQLJSON.serialize(value);
  }

  parseLiteral(ast: ValueNode, variables?: Record<string, unknown>) {
    return GraphQLJSON.parseLiteral(ast, variables || {});
  }
}
