
'use strict';

const resolvers = {
  Query: {
    hello: () => 'resolved',
    residents: (_, { id }, { dataSources }) => 
      dataSources.residentAPI.getAllResidents()
  }
}

module.exports = resolvers 