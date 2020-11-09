import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials } from '../helpers/stub-helpers';



function getTitleObject(i: number = 0): any {
  return {
    en: `title en ${i}`,
    ge: `title ge ${i}`,
  };
}

function getAuthorObject(i: number = 0): any {
  return {
    en: `author en ${i}`,
    ge: `author ge ${i}`,
  };
}

function getImageObject(i: number = 0): any {
  return { url: generateImage() };
}

function getAmazonPriceObject(i: number = 0): any {
  return _.random(1, 20);
}

function getAmazonLinkObject(i: number = 0): any {
  return 'amazonLink';
}

function getPriceObject(i: number = 0): any {
  return _.random(1, 20);
}

const BooksStub = {
  
  title: getTitleObject(),
  author: getAuthorObject(),
  image: getImageObject(),
  amazonPrice: getAmazonPriceObject(),
  amazonLink: getAmazonLinkObject(),
  price: getPriceObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(BooksStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    position: i,
    
    title: getTitleObject(i),
    author: getAuthorObject(i),
    image: getImageObject(i),
    amazonPrice: getAmazonPriceObject(i),
    amazonLink: getAmazonLinkObject(i),
    price: getPriceObject(i),
  }));
}
