const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    hello: String 
    launch(id: ID!): Launch
    residents: [Resident] 
    resident(id: ID): Resident 
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
    content: String
    lang: String
    channelType: String
  }

  type Resident {
    First_Name: String
    Last_Name: String
    address_1: String
    address_2: String
    consentGiven: String
    dateOfBirth: String
    firstName: String
    gender: String
    lastName: String
    middleName: String
    additionalIdentificationType: String
    additionalIdentificationValue: String
    cellphoneNumber: String
    countryCode: String
    countryName: String
    emailAddress: String
    id: ID! 
    lastNameSuffix: String
    poorCardHas: String
    poorCardNumber: String
    poorCardReason: String
    postalCode: String
    provinceCity: String
  }

  type contactDetails {
    emailAddress: String
    countryCode: String
    cellphoneNumber: String
  }




  
`;

module.exports = typeDefs;
