const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const express = require('express');
const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


const startApolloServer = async (typeDefs, resolvers) => {
  console.log('Initializing Apollo Server...');
  await server.start();
  console.log('Apollo Server started.');

  server.applyMiddleware({ app });

  db.once('open', () => {
    console.log('Database connection established.');
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer(typeDefs, resolvers);
