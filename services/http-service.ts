
import { AxiosPromise } from './../node_modules/axios/index.d';
import { BehaviorSubject, Observable } from 'rxjs';
import { getAPIUrl, query_config } from './interfaces';
import get from "axios";



export const  newsSubject: BehaviorSubject<string | Array<any> | AxiosPromise | Observable<Promise<any>>> = new BehaviorSubject('getting news yet');



export const searchNewsTopic = (q_config:query_config): AxiosPromise<any> => {
  const url:string = getAPIUrl(q_config);
  console.log('url',url)
  return get(url);
}