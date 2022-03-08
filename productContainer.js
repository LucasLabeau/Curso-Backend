// LLAMADA A DB
const { config } = require('./options/config.js');
const knex = require('knex');

// VARIABLES GLOBALES
const fs = require('fs');

const path = './data.json';

const knexMaria = knex(config.mariaDB);

// DECLARACIÓN DE CLASE
class Contenedor {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
  }

  // MÉTODOS

  // GUARDAR PRODUCTO DE PRUEBA
  saveDefault() {
    let products = [];
    let reader = fs.readFileSync(path, 'utf-8');
    let contenido = JSON.parse(reader);

    for (let i=0; i<contenido.length; i++) {
      products.push(contenido[i]);
    }

    knexMaria('products').insert(products)
      .then(() => console.log('Products inserted!'))
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knexMaria.destroy());
  }

  // GUARDAR PRODUCTO
  save(obj) {
    let newProduct = {title:obj.title, price:obj.price};
    let id;
    knexMaria('products').insert(newProduct)
      .then(() => console.log('New product inserted!'))
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knexMaria.destroy());

    return newProduct;
  }

  // BUSCAR UN ID Y DEVOLVER PRODUCTO
  async getById(id) {
    let products = [];

    knexMaria.from('products').select('*').where('id', '=', id)
      .then(rows => {
        for (let row of rows) {
          products.push(row);
        }
      })
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knexMaria.destroy());

      return await products[0];
  }

  // DEVOLVER TODOS LOS PRODUCTOS
  getAll() {
    let products = [];

    knexMaria.from('products').select('*')
      .then(rows => {
        for (let row of rows) {
          products.push({id: row.id, title: row.title, price: row.price});
        }
      })
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knexMaria.destroy());

      return products;
  }

  // BORRAR UN PRODUCTO SEGÚN SU ID
  deleteById(id) {
    knexMaria.from('products').where('id', '=', id).del()
      .then(() => console.log('Product deleted'))
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knexMaria.destroy());
  }

  // BORRAR TODOS LOS PRODUCTOS
  deleteAll() {
    knexMaria.from('products').where('id', '>', 0).del()
      .then(() => console.log('Products deleted'))
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knexMaria.destroy());
  }
}

// EJECUCIONES DE PRUEBA

let prod1 = new Contenedor("Cartuchera", 400);
// prod1.save(prod1);
//
let prod2 = new Contenedor("Lapicera", 50);
// prod2.save(prod2);
//
let prod3 = new Contenedor("Lapiz", 20);
// prod3.save(prod3);
//
let prod4 = new Contenedor("Cuaderno", 200);
// prod4.save(prod4);
//
let prod5 = new Contenedor("Marcador", 100);
// prod5.save(prod5);


module.exports = {
  Contenedor: Contenedor
};
