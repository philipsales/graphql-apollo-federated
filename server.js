'use strict';
require('./src/server/config/config');

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/server/schema'); 
//const typeDefs = require('./src/server/schema'); 

const resolvers = require('./src/server/resolver');
//const resolvers = require('./src/domains/residents/resolver');

const LaunchAPI = require('./src/domains/launch/launch');
const MessageAPI = require('./src/domains/messages/dataSources/message');
const ResidentAPI = require('./src/domains/residents/dataSources/resident');

const log = require('./src/server/lib/logger/logger');
const logger = log.logger.child({ sourceFile: log.file.setFilename(__filename) });

const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  messageAPI: new MessageAPI(),
  residentAPI: new ResidentAPI()
});

const rootResolveFunction = (parent, args, context, info) => {
  //perform action before any other resolvers
};

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
  server.listen({ port: 4001 }).then(({ url }) => {
    logger.info('🚀 initialize server');
    console.log(`🚀 app running at ${url}`);
  });
}

module.exports = { 
  dataSources,
  typeDefs,
  resolvers,
  LaunchAPI,
  MessageAPI,
  ResidentAPI 
}