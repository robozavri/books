import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials } from '../helpers/stub-helpers';



function getTitleObject(i: number = 0): any {
  return {
    en: `title en ${i}`,
    ge: `title ge ${i}`,
  };
}

const CategoriesStub = {
  
  title: getTitleObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(CategoriesStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    position: i,
    
    title: getTitleObject(i),
  }));
}
