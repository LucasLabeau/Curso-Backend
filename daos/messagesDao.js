import ContainerMongoDB from '../containers/ContainerMongoDB.js';

class messagesDao extends ContainerMongoDB {
  constructor() {
    super(
      'messages',
      {
        author: {
          id: {type: String, require: true},
          name: {type: String, require: true},
          surname: {type: String, require: true},
          age: {type: Number, require: true},
          alias: {type: String, require: true},
          avatar: {type: String, require: true}
        },
        text: {type: String, require: true}
      }
    )
  }
}

let msg = new messagesDao;

export default msg;
