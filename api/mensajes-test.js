import { faker } from '@faker-js/faker';

const authorMaker = () => {
  let fullName = faker.name.findName();
  let alias = fullName.replace(/\s+/g, '');

  let author = {
    id: faker.random.alphaNumeric(12),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 70, precision: 1 }),
    alias: alias,
    avatar: faker.image.avatar()
  }

  return author;
}
