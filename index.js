// LLAMADA A DB
const { options } = require('./options/mariaDB.js');
const knex = require('knex')(options);

// VARIABLES GLOBALES
const fs = require('fs');

const path = './data.json';

// DECLARACIÓN DE CLASE
class Contenedor {
  constructor(title, price) {
    this.title = title;
    this.price = price;
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

    knex('products').insert(products)
      .then(() => console.log('Products inserted!'))
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knex.destroy());
  }

  // GUARDAR PRODUCTO
  save(obj) {
    let products = [];
    let newProduct = {title:obj.title, price:obj.price};
    let id;
    knex('products').insert(newProduct)
      .then(() => console.log('New product inserted!'))
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knex.destroy());

    return newProduct;
  }

  // BUSCAR UN ID Y DEVOLVER PRODUCTO
  async getById(id) {
    let products = [];

    knex.from('products').select('*').where('id', '=', id)
      .then(rows => {
        for (let row of rows) {
          products.push(row);
        }
      })
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knex.destroy());

      return await products[0];
  }

  // DEVOLVER TODOS LOS PRODUCTOS
  async getAll() {
    let products = [];

    knex.from('products').select('*')
      .then(rows => {
        for (let row of rows) {
          products.push({id: row.id, title: row.title, price: row.price});
        }
      })
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knex.destroy());

      return await products;
  }

  // BORRAR UN PRODUCTO SEGÚN SU ID
  deleteById(id) {
    knex.from('products').where('id', '=', id).del()
      .then(() => console.log('Product deleted'))
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knex.destroy());
  }

  // BORRAR TODOS LOS PRODUCTOS
  deleteAll() {
    knex.from('products').whereExists('id').del()
      .then(() => console.log('Product deleted'))
      .catch(e => console.error({codigo: `${e.errno} -> ${e.code}`, msg: e.sqlMessage}))
      .finally(() => knex.destroy());
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
