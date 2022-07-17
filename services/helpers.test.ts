import { generateQueryConfig } from "./helpers";
import { NSP, Q_Types } from './interfaces';

describe('queryConfig generator tests', () => { 
  test('valid nsp and q_type lang and country test',() => {         
    // test all values

    expect(generateQueryConfig({ lang: 'Hindi', country: 'IN' }, NSP.gnews, Q_Types.topic)).
      toEqual({ nsp: NSP.gnews,q_string:undefined, q_type: Q_Types.topic, lang: 'Hindi', country: 'IN' });
  });
  
  test('valid nsp and q_type but empty lang and country test', () => {
    expect(generateQueryConfig({}, NSP.gnews, Q_Types.topic)).
      toEqual({ nsp: NSP.gnews, q_string:undefined, q_type: Q_Types.topic, lang: undefined, country: undefined });
  });
  test('invalid nsp and q_type but empty lang and country test', () => {
   expect(()=>generateQueryConfig({}, "", "")).toThrowError(new Error("invalid NSP: or query type "));
  })

});
