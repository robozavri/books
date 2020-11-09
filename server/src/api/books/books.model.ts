import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const BooksSchema = new Schema({
  title: multilingualSchema,
  author: multilingualSchema,
  image: imageSchema,
  amazonPrice: Number,
  amazonLink: String,
  price: Number,
  
  position: Number,
});

export default model('Books', BooksSchema);