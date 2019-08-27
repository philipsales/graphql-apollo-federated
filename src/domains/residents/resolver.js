
'use strict';

const resolvers = {
  Query: {
    residents: (_, { id }, { dataSources }) => 
      dataSources.residentAPI.getAllResidents()
  }
}

module.exports = resolvers 