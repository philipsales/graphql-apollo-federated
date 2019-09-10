'use strict';

const axios = require('axios');
const querystring = require('querystring');
const couchbase = require('couchbase');
const auth = "Basic " + new Buffer
	.from("curisAdminUser" + ":" + "adm(1)mwh")
  .toString("base64")
  
axios.defaults.headers.common['Authorization'] = auth;
axios.defaults.headers.post['Content-Type'] = "application/json";

class ResidentAPI {
  constructor() { 

    this.cluster = new couchbase.Cluster("couchbase://139.162.49.49:8091");
    this.cluster.authenticate("", "Awhp1idb")

    //this.cluster = new couchbase.Cluster("couchbase://localhost:8091");
    //this.cluster.authenticate("", "")
    this.bucket = this.cluster.openBucket("awhpiidb");

    //this.cluster = new couchbase.Cluster(process.env.COUCHBASE_URI);
    //this.cluster.authenticate(process.env.COUCHBASE_N1QL_USERNAME, process.env.COUCHBASE_N1QL_PASSWORD)

  }

  residentReducer(answer) {
    console.log('inside reducer');
    return {
      address_1: answer.Address_1,
      address_2: answer.Address_2,
      consentGiven: answer.Consent_Given,
      DoB: answer.DoB,
      First_Name: answer.First_Name,
      Gender: answer.Gender,
      Last_Name: answer.Last_Name,
      Middle_Name: answer.Middle_Name,
      additionalIdentificationType: answer.additionalIdentificationType,
      additionalIdentificationValue: answer.additionalIdentificationValue,
      cellphoneNumber: answer.cellphoneNumber,
      countryCode: answer.countryCode,
      countryName: answer.countryName,
      emailAddress: answer.emailAddress,
      lastNameSuffix: answer.lastNameSuffix,
      poorCardHas: answer.poorCardHas,
      poorCardNumber: answer.poorCardNumber, 
      poorCardReason: answer.poorCardReason,
      postalCode: answer.postalCode, 
      provinceCity: answer.provinceCity, 

      _id: answer._id,
      createdBy: answer.createdBy,
      organization: answer.organization,
      dateCreated: answer.dateCreated
    }
  }

  async getResident(residentID) {
    console.log('RESIDENT ID', residentID);
    console.log('process ENV',process.env.COUCHBASE[0].COUCHBASE_BUCKET);

    let statement = "SELECT awhpiidb.answers.*,  awhpiidb.createdBy as createdBy FROM awhpiidb limit 1";
    console.log(statement);
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


  async getResidents(args) {
    console.log('process ENV',process.env.COUCHBASE[0].COUCHBASE_BUCKET);
    console.log('Resident', args);

    let statement = this.setQuery(args);
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

  setQuery(args){
    let whereClause = this.parseFilters(args.filter)
    let orderClause = this.parseOrder(args.orderBy)
    let offsetClause = this.parseOffset(args.offset)
    let limitClause = this.parseLimit(args.limit)

    let statement = `SELECT meta().id as _id, createdBy as createdBy, organization as organization, dateCreated as dateCreated, answers.* FROM awhpiidb`;

    if (whereClause)
        statement += whereClause
    if (orderClause)
        statement += orderClause 
    if (offsetClause)
        statement += offsetClause 
    if (limitClause)
        statement += limitClause 

    console.log('SetQuery', statement);

    return statement;
  }

  parseFilters(data){
    let filters = '';

    Object.keys(data).forEach((key, idx, array) => {
      let kv;
      let match = this.matchMetaDataFields(key)

      if(match){
        kv = "" + key + '="' + data[key]+ '" ';
      }
      else{
        kv = "answers." + key + '="' + data[key]+ '" ';
      }

      if (idx !== array.length - 1){ 
        filters += kv + "AND "
      }
      else {
        filters += kv
      }
    });

    return " WHERE " + filters;
  }

  matchMetaDataFields(key){
    let meta = ["organization", "createdBy"];
    return meta.find(x => x === key)
  }

  parseOrder(orderBy){

    if(orderBy){
      let field; 
      let key = orderBy.split("_")[0];
      let match = this.matchMetaDataFields(key)

      if(match){
        field = orderBy.replace(/_/g, ' ');
      } 
      else {
        field = "answers." + orderBy.replace(/_/g, ' ');
      }
    return " ORDER BY "  + field 
    }
  }

  parseOffset(offset){
    if(offset)
      return " OFFSET " + offset;
  }

  parseLimit(limit){
    if(limit)
      return " LIMIT " + limit; 
  }

  async postResident(args) {
    var url = "http://139.162.49.49:4984/awhpiidb/"
    let data = args.input;
    
    let promise = new Promise((resolve,reject) => {
      axios.post(url, data)
        .then((response) => {
          let result = { 
            "id": response.data.id,
            "ok": response.data.ok
          };
          console.log(result);
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });

      }); 

      let result = await promise; 
      return result;
  }

  async updateResident(args) {
    let revision = await this.getLatestRevision(args.id);
    let url = `http://139.162.49.49:4984/awhpiidb/${args.id}?new_edits=true&rev=${revision}`

    let meta =  args.input._residentMeta
    let answers =  args.input.answers
    let data = {...meta, answers}

    let promise = new Promise((resolve,reject) => {
      axios.put(url, data)
        .then((response) => {
          let result = { 
            "id": response.data.id,
            "ok": response.data.ok
          };
          console.log(result);
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });

      }); 

      let result = await promise; 
      return result;
  }

  async getLatestRevision(id) {
    var url = `http://139.162.49.49:4984/awhpiidb/${id}?revs=true`;
    
    let promise = new Promise((resolve,reject) => {
      axios.get(url)
        .then((response) => {
          let result = response.data._rev;
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });

      }); 

      return await promise; 
  }
}

module.exports = ResidentAPI;
