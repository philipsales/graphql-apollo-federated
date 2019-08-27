'use strict';
require('../../../src/server/config/config');

const log = require('../../../src/server/lib/logger/logger');
const logger = log.logger.child({ sourceFile: log.file.setFilename(__filename) });

const { ApolloServer } = require('apollo-server');

const typeDefs = require('./typeDefs/query.gql'); 

const resolvers = require('./resolver');

const MessageAPI = require('./dataSources/message');


const dataSources = () => ({
  messageAPI: new MessageAPI()
});

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    dataSources,
    tracing: true,
    cacheControl: false,
    debug: true,
    engine: {
      apiKey: process.env.APOLLO_ENGINE_KEY,
    },
});

if (process.env.NODE_ENV !== 'test'){
  server.listen({ port: 4002 }).then(({ url }) => {
    logger.info('🚀 initialize message server');
    console.log(`🚀 app running at ${url}`);
  });
}

module.exports = { 
  dataSources,
  typeDefs,
  resolvers,
  MessageAPI 
}