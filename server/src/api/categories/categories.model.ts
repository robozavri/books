import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';

const CategoriesSchema = new Schema({
  title: multilingualSchema,
  
  position: Number,
});

export default model('Categories', CategoriesSchema);