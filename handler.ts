import {  APIGatewayProxyEvent, Context, APIGatewayProxyCallback } from 'aws-lambda';
import { generateQueryConfig } from './services/helpers';

import { searchNewsTopic } from "./services/http-service";
import { query_config, NSP, Q_Types } from './services/interfaces';


 
export const searchGNews = async (event: APIGatewayProxyEvent, context: Context, Callback: APIGatewayProxyCallback) => {
  return new Promise((resolve, reject) => {
    const q_config: query_config = generateQueryConfig(event, NSP.gnews, Q_Types.search);
      searchNewsTopic(q_config)
        .then(result => {
          resolve(result.data)
        })
        .catch(err => reject(err))
    });
};

export const searchGTopic = async (event: APIGatewayProxyEvent, context: Context, Callback: APIGatewayProxyCallback) => {
  const q_config: query_config = generateQueryConfig(event, NSP.gnews, Q_Types.topic);

  const data = await searchNewsTopic(q_config)
  
    
};