import mongoose from 'mongoose';
import Product from './models/Product.js';

const url = 'mongodb+srv://root:Kokulo21@ecomm.9xug9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url)
  .then(async() => {
    try {
      const prod1 = new Product({title: "Cartuchera", price: 400});
      let doc1 = await prod1.save();
      console.log(doc1)
      const prod2 = new Product({title: "Lapicera", price: 50});
      let doc2 = await prod2.save();
      console.log(doc2)
      const prod3 = new Product({title: "Lapiz", price: 20});
      let doc3 = await prod3.save();
      console.log(doc3)
      const prod4 = new Product({title: "Cuaderno", price: 200});
      let doc4 = await prod4.save();
      console.log(doc4)
      const prod5 = new Product({title: "Marcador", price: 100});
      let doc5 = await prod5.save();
      console.log(doc5)

    } catch (e) {
      console.error(`Error: ${e}`)
    } finally {
      mongoose.disconnect().catch(e => console.error(e))
    }
  })
  .catch(e => console.error(e))
  .finally(() => {
    console.log('Conectado a la DB')
  })
