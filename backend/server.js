require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require('http');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { json } = require('body-parser');
const resolvers = require("./Graphql/resolvers");
const typeDefs = require("./Graphql/typeDefs");
const port = process.env.PORT || 3001;
const Manager = require('./model/accountModel');


(async function start() {

  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });


  // connecting to database
  await connectDB();

  // Ensure we wait for our server to start
  await server.start();
  
  app.use(cors());
  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/graphql',
    // cors({ origin: '*' }),
    json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async () => ({
        Manager
      })
    }),
  );


  // app.use(cors());
  app.get('/', (req, res) => {
    res.send('APIs working properly.');
  });

  app.use("/api/manager/", require("./routes/accountRoutes"));
  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);

})();



