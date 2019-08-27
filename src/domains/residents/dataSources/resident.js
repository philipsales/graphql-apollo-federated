'use strict';

const couchbase = require('couchbase');

class ResidentAPI {
  constructor() { 
    this.cluster = new couchbase.Cluster("couchbase://139.162.49.49:8091");
    this.cluster.authenticate("", "Awhp1idb")
    this.bucket = this.cluster.openBucket("awhpiidb");

  }

  residentReducer(answer) {
    console.log('inside reducer');
    return {
      firstName: answer.First_Name,
      lastName: answer.Last_Name,
      address_1: answer.Address_1,
      address_2: answer.Address_2,
      consentGiven: answer.Consent_Given,
      dateOfBirth: answer.DoB,
      firstName: answer.First_Name,
      gender: answer.Gender,
      lastName: answer.Last_Name,
      middleName: answer.Middle_Name,
      additionalIdentificationType: answer.additionalIdentificationType,
      additionalIdentificationValue: answer.additionalIdentificationValue,
      cellphoneNumber: answer.cellphoneNumber,
      countryCode: answer.countryCode,
      countryName: answer.countryName,
      emailAddress: answer.emailAddress,
      id: answer.id,
      lastNameSuffix: answer.lastNameSuffix,
      poorCardHas: answer.poorCardHas,
      poorCardNumber: answer.poorCardNumber, 
      poorCardReason: answer.poorCardReason,
      postalCode: answer.postalCode, 
      provinceCity: answer.provinceCity, 
    }
  }

  async getAllResidents() {
    let statement = "SELECT awhpiidb.answers.*  FROM awhpiidb limit 5";
    let query = couchbase.N1qlQuery.fromString(statement);

    let promise = new Promise((resolve,reject) => {
      this.bucket.query(query, (error, response) => {
        if(error){
          console.log(error);
          reject(error)
        } 
        else {
          return resolve(response);
        }
      })
    }); 

    let result = await promise; 
    
    return Array.isArray(result)
      ? result.map(resident => this.residentReducer(resident)) : [];
  }

  async getResident() {
    console.log(id);
    let statement = "SELECT awhpiidb.answers.*  FROM awhpiidb limit 5";
    let query = couchbase.N1qlQuery.fromString(statement);

    let promise = new Promise((resolve,reject) => {

      this.bucket.query(query, (error, response) => {
        if(error){
          console.log(error);
          reject(error)
        } 
        else {
          return resolve(response);
        }
      })
    }); 

    let result = await promise; 
    return Array.isArray(result)
      ? result.map(resident => this.residentReducer(resident)) : [];
  }
}

module.exports = ResidentAPI;
