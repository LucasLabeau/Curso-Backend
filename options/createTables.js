const { config } = require('./config.js');
const knex = require('knex');

const productsTable = async() => {
  try {
    const mariaDB = knex(config.mariaDB);

    await mariaDB.schema.dropTableIfExists('products');

    await mariaDB.schema.createTable('products', table => {
      table.increments('id').primary();
      table.string('title', 100).notNullable();
      table.decimal('price', 8, 2).notNullable();
      table.string('img', 300);
    });

    await mariaDB.destroy();

  } catch (e) {
    console.error("Error al crear la base de datos: " + e);
  }
}

const messagesTable = async() => {
  try {
    const sqlite = knex(config.sqlite3);

    await sqlite.schema.dropTableIfExists('messages');

    await sqlite.schema.createTable('messages', table => {
      table.increments('id').primary();
      table.string('author', 50);
      table.string('message', 200);
      table.string('fyh', 50);
    })

    await sqlite.destroy();
  } catch (e) {
    console.error("Error al crear la base de datos: " + e);
  }
}

productsTable();
messagesTable();

// knex.schema.createTable('products', table => {
//   table.increments('id').notNullable();
//   table.string('title', 50).notNullable();
//   table.decimal('price', 8, 2).notNullable();
//   table.string('img', 300);
// })
//   .catch(error => {
//     console.error(
//       {
//         codigo: `${error.errno} -> ${error.code}`,
//         msg: error.sqlMessage
//       }
//     );
//   })
//   .finally(() => {
//     knex.destroy();
//   });
