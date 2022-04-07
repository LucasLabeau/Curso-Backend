import { faker } from '@faker-js/faker';

const fiveProducts = () => {
  const products = [];

  for (let i = 0; i < 5; i++) {
    let name = faker.commerce.product();
    let price = faker.commerce.price();
    let img = faker.image.food();
    let obj = {
      name: name,
      price: price,
      img: img
    }
    products.push(obj)
  }
  return products;
}

export default fiveProducts;
