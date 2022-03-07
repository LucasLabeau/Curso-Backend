const path = require('path');

const config = {
  sqlite3: {
    client: 'better-sqlite3',
    connection: {
      filename: path.resolve(__dirname, './DB/ecommerce.sqlite')
    },
    useNullAsDefault: true
  },

  mariaDB: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'trial'
    }
  }
}

module.exports = {
  config
}
