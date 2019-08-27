'use strict';

const { RESTDataSource } = require('apollo-datasource-rest');

class MessageAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://message-content.herokuapp.com/v1/messages';
  }

  messageReducer(message) {
    return {
      id: message._id, 
      messageCode: message.messageCode,
      messageContent: message.messageContent,
      lang: message.lang,
      channelType: message.channelType
    }
  }

  async getAllMessages() {
    const response = await this.get('');

    return Array.isArray(response)
      ? response.map(message => this.messageReducer(message)) : [];
  }

}

module.exports = MessageAPI;
