import { writeFile } from "fs";

export  enum NSP{
  bing = "BING",
  gnews="gnews"
};
export  enum Q_Types { 
  search = "search",
  topic = "topic",
  highlight = 'highlight'
}

export interface query_config {
  nsp: string;
  q_type: string;
  q_string?: string;
  country?: string;
  lang?: string ;
  max?: number;
};

export interface ApiGatewayLambdaResponse { 
  statusCode: number;
  body:string
};

export const generateQueryUrl = (q_config: query_config, nsp_config:NSP_Config): string => {
  const query_string = nsp_config.get_query_string(q_config)
  switch (q_config.q_type) {
    case Q_Types.search:
      return nsp_config.baseSearchUrl + query_string;
    case Q_Types.topic:
      return nsp_config.baseTopicUrl + query_string;
    default:
      return nsp_config.baseHighlightsUrl + query_string;
  };
};

export abstract class NSP_Config{
  nsp: NSP = NSP.bing;
abstract baseSearchUrl: string;
abstract baseTopicUrl: string;
         baseHighlightsUrl?: string;
  q_type: string='topic';
  q_string?: string='highlights';
  country?: string='us';
  lang?: string = 'en';
  max?: number = 10;

  get_query_string = (q_config: query_config): string => {
    const { q_string = this.q_string, country = this.country, lang = this.lang } = q_config;
    return `q=${q_string}&country=${country}&lang=${lang}`
  };

  abstract generte_query_url: Function;

};

//1) defiene atpmic data types interfaces, enums, arrays, tuples, maps, 

export class gnews_api_config extends NSP_Config {
  baseSearchUrl: string = `https://gnews.io/api/v4/search?`;
  baseTopicUrl: string = `https://gnews.io/api/v4/top-headlines?`;
  token: string = process.env.GNews_AuthKey;
  constructor() {
    super();
  };
  generte_query_url =(q_config:query_config)=> generateQueryUrl(q_config,this)

};

export class bing_news_api_config extends NSP_Config{
  baseHighlightsUrl: string = "https://api.bing.microsoft.com/v7.0/news/trendingtopics";
  baseSearchUrl: string = "https://api.bing.microsoft.com/v7.0/news/search";
  baseTopicUrl: string = "https://api.bing.microsoft.com/v7.0/news?mkt=en-us&category=";

  constructor() {
    super();
  };
  generte_query_url = (q_config:query_config)=> generateQueryUrl(q_config,this)
};

//nsp = NSP.bing, q_type = Q_Types.topic, q_string = 'breaking news', country, lang

export const getAPIUrl = (q_config: query_config): string => {
  switch (q_config.nsp) { 
    case NSP.gnews:
      return new gnews_api_config().generte_query_url(q_config);
     default:
       return new bing_news_api_config().generte_query_url(q_config);
  };
};

export const writeDataToFile = (news: []): void => {
  console.log(`got path`, __dirname)
  writeFile(`${__dirname}/news.js`, JSON.stringify(news), { encoding: 'utf8', flag: 'w+' }, err => console.log(err));
};
