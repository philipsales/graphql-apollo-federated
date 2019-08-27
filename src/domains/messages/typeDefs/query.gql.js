const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    launch(id: ID!): Launch
    messages: [Message] 
  }

  type Launch {
    id: ID!
    site: String
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type Message {
    messageCode: String
    messageContent: String
    lang: String
    channelType: String
  }

  
`;

module.exports = typeDefs;
