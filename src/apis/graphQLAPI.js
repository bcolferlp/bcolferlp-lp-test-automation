import { GraphQLClient } from 'graphql-request';

export default class GraphQL {
  constructor(endpoint, authToken) {
    this.endpoint = endpoint;
    this.authToken = authToken;
  }

  getClient() {
    const { endpoint, authToken } = this;
    return new GraphQLClient(endpoint, {
      headers: {
        Authorization: authToken
      }
    });
  }

  async request(query, variables = {}) {
    try {
      const client = this.getClient();
      const result = await client.request(query, variables);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}
