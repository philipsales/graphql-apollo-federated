
'use strict';

const resolvers = {
  Query: {
    Resident: (_, { id }, { dataSources }) => 
      dataSources.residentAPI.getResident(id),
    Residents: (_,  args , { dataSources }) => 
      dataSources.residentAPI.getResidents(args)
  },
  Mutation: {
    createResident: (_,  args , { dataSources }) => 
      dataSources.residentAPI.postResident(args),
    updateResident: (_, args, { dataSources }) => 
      dataSources.residentAPI.updateResident(args)
  }
}

module.exports = resolvers 