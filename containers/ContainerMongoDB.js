import mongoose from 'mongoose';
import config from '../utils/config.js';

const url = config.mongodb.url;

await mongoose.connect(url);

class ContainerMongoDB {
  constructor(coleccion, schema) {
    this.coleccion = mongoose.model(coleccion, schema)
  }

  async listAll() {
    try {
      const docs = await this.coleccion.find({});
      return docs;
    } catch (e) {
      console.error(e);
    } finally {
      console.log("Mostrando todos los docs de la colección...");
      mongoose.disconnect().catch(e => console.error(e));
    }

  }
}

let obj = new ContainerMongoDB('products',
{
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

console.log(await obj.listAll())
