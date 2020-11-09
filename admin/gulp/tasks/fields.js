/* valid types */
/*
  String 
  Number
  Date
  multilingualSchema
  imageSchema
  [imageSchema]
  Socials
  multilingualSchema-Textarea
  multilingualSchema-quill-editor
  quill-editor
  Textarea
  Slide-toggle
  Meta

  Reference
  Select
*/
// note: object key titles must be camelCase

// available langs
export const availableLangs = ['en', 'ge' ];

// list display fields
// only String or multilingualSchema
export const listFields = {
  title: 'multilingualSchema',
  // title: 'multilingualSchema', 
};

export const refFields = {
  testReference: {
    //  reference must be camelCase
    reference: 'blogCategory',
    //  single/multiple
    referenceType: 'multiple',
    value: '_id',
    displayFieldName: 'title?.ge',
  }
}

export const selectFields = {
  testSelect: {
    //  single/multiple
    selectType: 'single',
    values: ['metal', 'rock', 'classic', 'black']
  }
}

export const fields = {
  title: 'multilingualSchema',
  author: 'multilingualSchema',
  image: 'imageSchema',
  amazonPrice: 'Number',
  amazonLink: 'String',
  price: 'Number',
}