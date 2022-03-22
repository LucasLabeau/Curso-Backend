import ContainerMongoDB from '../containers/ContainerMongoDB.js';

class cartsDao extends ContainerMongoDB {
  constructor() {
    super(
      'carts',
      {
        userId: {type: String, require: true},
        date: {type: Date, default: Date.now },
        content: [
          {title: {type: String, require: true}, price: {type: Number, require: true, default: 0}}
        ]
      }
    )
  }
}

export default cartsDao;

let obj = new cartsDao;

console.log(await obj.listAll());
