import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  img: {
    type: String
  }
});

const productModel = model('products', productSchema)

export default productModel;
