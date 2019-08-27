const { gql } = require('apollo-server');

const GQLtypes = gql`

  type Query {
      residents: [Resident] 
      resident(id: ID): Resident 
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

module.exports = GQLtypes;
