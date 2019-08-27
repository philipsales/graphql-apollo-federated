
'use strict';

const resolvers = {
  Query: {
    messages: (_, { id }, { dataSources }) =>
      dataSources.messageAPI.getAllMessages(),
  }
}

module.exports = resolvers 