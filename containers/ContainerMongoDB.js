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
    }

  }

  async listOne(query) {
    try {
      const doc = await this.coleccion.find(query);
      console.log(doc);
      return doc;
    } catch (e) {
      console.error(e);
    }
  }

  async write(obj) {
    try {
      await new this.collection(obj).insertOne();
      console.log(`Saved object: ${obj}`);
    } catch (e) {
      console.error(e)
    }
  }

  async delete(query) {
    try {
      let deleter = await this.collection.deleteOne(query);
      console.log(deleter);
    } catch (e) {
      console.error(e);
    }
  }

  async update(query, newParam) {
    try {
      let updater = await this.collection.updateOne(
        query,
        newParam
      );
      console.log(`Object updated: ${updater}`);
    } catch (e) {
      console.error(e)
    }
  }

}

export default ContainerMongoDB;
