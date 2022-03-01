const { options } = require('./mariaDB.js');
const knex = require('knex')(options);

knex.schema.createTable('products', table => {
  table.increments('id').notNullable();
  table.string('title', 50).notNullable();
  table.decimal('price', 8, 2).notNullable();
  table.string('img', 300);
})
  .then(() => {

  })
  .catch(error => {
    console.error(
      {
        codigo: `${error.errno} -> ${error.code}`,
        msg: error.sqlMessage
      }
    );
  })
  .finally(() => {
    knex.destroy();
  });
