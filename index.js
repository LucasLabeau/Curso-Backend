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

  // GUARDAR PRODUCTO
  save(obj) {
    const checker = fs.existsSync(path);
    let products = [];

    let id;
    try {
      if (checker) {
        let reader = fs.readFileSync(path, 'utf-8');
        let contenido = JSON.parse(reader);
        id = contenido.length + 1;

        for (let i=0; i<contenido.length; i++) {
          products.push(contenido[i]);
        }

        products.push({id:id, title:obj.title, price:obj.price});
      } else {
        id=1;
        products.push({id:1, title:obj.title, price:obj.price});
      }
      let objJson = JSON.stringify(products);
      fs.writeFileSync(path, objJson);
    } catch(e) {
      console.error(e);
    }
    return id;
  }

  // BUSCAR UN ID Y DEVOLVER PRODUCTO
  async getById(id) {
    let products = [];
    try {
      let reader = await fs.promises.readFile(path, "utf-8");
      let contenido = JSON.parse(reader);
      for (let i=0; i<contenido.length; i++) {
        products.push(contenido[i]);
      }

      let filtered = products.find((el) => (el.id === id));
      return filtered;
    } catch (e) {
      console.error(e);
    }
  }

  // DEVOLVER TODOS LOS PRODUCTOS
  async getAll() {
    let products = [];

    try {
      let reader = await fs.promises.readFile(path, "utf-8");
      let contenido = JSON.parse(reader);
      for (let i=0; i<contenido.length; i++) {
        products.push(contenido[i]);
      }
      return products;
    } catch (e) {
      console.error(e);
    }
  }

  // BORRAR UN PRODUCTO SEGÚN SU ID
  deleteById(id) {
    let products = [];

    try {
      let reader = fs.readFileSync(path, 'utf-8');
      let contenido = JSON.parse(reader);
      for (let i=0; i<contenido.length; i++) {
        products.push(contenido[i]);
      }

      let filtered = products.filter((product) => (product.id != id));
      let objJson = JSON.stringify(filtered);
      fs.writeFileSync(path, objJson);
    } catch (e) {
      console.error(e);
    }
  }

  // BORRAR TODOS LOS PRODUCTOS
  deleteAll() {
    let products = [];
    let objJson = JSON.stringify(products);
    fs.writeFileSync(path, objJson);
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

// console.log(prod3.getById(3));

// console.log(prod1.getAll());

// prod1.deleteById(2);

// console.log(prod1.getAll());

// prod1.deleteAll();

// console.log(prod1.getAll());

module.exports = {
  Contenedor: Contenedor
};
