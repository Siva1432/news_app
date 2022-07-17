import { query_config, Q_Types, ApiGatewayLambdaResponse, NSP } from './interfaces';

export const isValidQuery = (nsp: string, q_type: string): boolean => {
  const isValidQueryType = Object.keys(Q_Types).indexOf(q_type);
  const isValidNSP = Object.keys(NSP).indexOf(nsp);
  return (isValidNSP >= 0 && isValidQueryType >= 0) ? true : false;
};

export const generateQueryConfig = (event, nsp: string, q_type: string): query_config=> {
  console.log(nsp,q_type)
  if (!isValidQuery(nsp, q_type)) {
    throw new Error(`invalid NSP:${nsp} or query type ${q_type}`);
  }
  return {
    nsp: nsp,
    q_type:q_type,
    q_string: event.search,
    lang: event.lang,
    country: event.country
  };
};

export const generateResponseObject = (code:number, data:string, err?:Error ): ApiGatewayLambdaResponse=>{
  return {
    statusCode: code,
    body:JSON.stringify(data?data:err)
  }
};