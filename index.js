const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  # Comments in GraphQL strings w/ Hash

  type Todo {
    title: String
    category: String
    complete: Boolean
  }

  type Category {
    name: String
    color: String
    todos: [Todo]
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    todos: [Todo]
    categories: [Category]
  }
  type Mutation {
    addCategory(name: String, color: String): Category
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const todos = [
  {
    title: "Empty the trash",
    category: "Fun",
    complete: false,
  },
];

const categories = [
  {
    name: "Fun",
    color: "#7817fc",
    todos,
  },
];

function save({ name, color }) {
  let item = { name, color };
  categories.unshift(item);
  return item;
}

const resolvers = {
  Query: {
    todos: () => todos,
    categories: () => categories,
  },
  Mutation: {
    async addCategory(_, { name, color }) {
      return await save({ name, color });
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`?  Server ready at ${url}`);
});
