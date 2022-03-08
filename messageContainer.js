const { config } = require('./options/config.js');
const knex = require('knex');
const knexSqlite = knex(config.sqlite3);

// DECLARACIÓN DE CLASE
class Mensaje {
  constructor(author, message, fyh) {
    this.author = author;
    this.message = message;
    this.fyh = fyh;
  }

  // MÉTODOS
  save(msg) {
    let newProduct = {author: msg.author, message: msg.message, fyh: msg.fyh,};
    knexSqlite('messages').insert(newProduct)
      .then(() => {
        console.log("Message saved");
      })
      .catch(e => console.error(e))
      .finally(() => knexSqlite.destroy())
  }

  async getAll() {
    let messages = [];
    knexSqlite.from('messages').select('*')
      .then(rows => {
        for (let row of rows) {
          messages.push({id: row.id, author: row.author, message: row.message, fyh: row.fyh});
        }
      })
      .catch(e => console.error(e))
      .finally(() => knexSqlite.destroy())
  }
}


module.exports = {
  Mensaje: Mensaje
};
