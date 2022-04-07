import ContainerMongoDB from '../containers/ContainerMongoDB.js';

class productsDao extends ContainerMongoDB {
  constructor() {
    super(
      'products',
      {
        title: {type: String, require: true},
        price: {type: Number, require: true, default: 0},
        img: {type: String}
      }
    )
  }
}

export default productsDao;

let obj = new productsDao;

console.log(await obj.listAll());
console.log(await obj.listOne({title: 'Cartuchera'}));
console.log(await obj.write({title: 'Compás', price: 750}));
/*console.log(await obj.update({title: 'Compás'}, {$set: {price: 700}}));
console.log(await obj.delete({title: 'Compás'}));*/
