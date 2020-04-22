const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require("./database");

const { Card } = require("./models/cards");

const typeDefs = gql`
  type Card {
    type: String
    data: String
    id: ID!
  }
  type Query {
    getCards: [Card]
  }
`;

const resolvers = {
  Query: {
    getCards: async () => await Card.find({}).exec()
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
