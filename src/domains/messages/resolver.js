
'use strict';

const resolvers = {
  Query: {
    messages: async (_, { id }, { dataSources }) =>
        dataSources.messageAPI.getAllMessages()
  }
}

module.exports = resolvers 