const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    messages: [Message] 
  }

  type Message {
    messageCode: String
    messageContent: String
    lang: String
    channelType: String
  }

  
`;

module.exports = typeDefs;
