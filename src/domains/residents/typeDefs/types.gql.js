const { gql } = require('apollo-server');
const { GraphQLDateTime } = require('graphql-iso-date');
const { GraphQLScalarType } = require('graphql');


const GQLtypes = gql`

  scalar Date

  type Query {
      Resident(id: ID!): Resident
      Residents(
        filter: PersonFilter!
        orderBy: PersonOrderBy
        offset: Int
        limit: Int!
        ): [Resident!]!
    }

  type Mutation {
    createResident(input: CreateResidentInput!): mutatePersonResponse!
    updateResident(id: ID!
      input: UpdateResidentInput!): mutatePersonResponse!
  }

  type mutatePersonResponse {
    id: ID
    ok: String
  }

  input PersonFilter {
    organization: String
    createdBy: String
    Last_Name: String
    First_Name: String
    Middle_Name: String
    dateCreated: Date 
    DoB: String
    dateRange: DateRange
  }

  input DateRange {
    dateName: DateName
    dateFrom: Date
    dateTo: Date
  }

  interface Node {
    _id: ID!
    dateCreated: Date 
  }


  type Resident {
    address_1: String
    address_2: String
    consentGiven: String
    DoB: Date 
    First_Name: String
    Gender: String
    Last_Name: String
    Middle_Name: String
    additionalIdentificationType: String
    additionalIdentificationValue: String
    cellphoneNumber: String
    countryCode: String
    countryName: String
    emailAddress: String
    lastNameSuffix: String
    poorCardHas: String
    poorCardNumber: String
    poorCardReason: String
    postalCode: String
    provinceCity: String
    createdBy: String
    organization: String
    dateCreated: Date 
  }

  input _ResidentMeta {
    createdBy: String!
    organization: String!
    type: String!
    dateCreated: Date!
  }

  input CreateResidentInput {
    _residentMeta: _ResidentMeta!
    answers: Answer!
  }

  input UpdateResidentInput {
    _residentMeta: _ResidentMeta!
    answers: Answer!
  }

  input Answer {
    address_1: String
    address_2: String
    consentGiven: String
    DoB: Date 
    First_Name: String
    Gender: String
    Last_Name: String
    Middle_Name: String
    additionalIdentificationType: String
    additionalIdentificationValue: String
    cellphoneNumber: String
    countryCode: String
    countryName: String
    emailAddress: String
    lastNameSuffix: String
    poorCardHas: String
    poorCardNumber: String
    poorCardReason: String
    postalCode: String
    provinceCity: String
  }

  enum DateName {
    dateCreated
    DoB
  }

  enum PersonOrderBy {
    Last_Name_ASC
    Last_Name_DESC
    DoB_ASC 
    DoB_DESC
    Gender_ASC
    Gender_DESC
    createdBy_ASC
    createdBy_DESC
    organization_ASC
    organization_DESC
    provinceCity_ASC
    provinceCity_DESC
    address_1_ASC
    address_1_DESC
  }

`;

module.exports = GQLtypes;
