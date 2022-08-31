import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/Customer";
import Address from "../../../domain/customer/value-obejct/Address";
import Product from "../../../domain/product/entity/Product";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/model/product.model";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test find customer use case', () => {


  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer("123", "Jhon");
    const address = new Address("Street", 123, "city", "zip ");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: '123'
    }

    const output = {
      id: '123',
      name: 'Jhon',
      address: {
        street: "Street",
        city: "city",
        number: 123,
        zip: "zip"
      },

    }
    const result = usecase.execute(input)
    expect(result).toEqual(output)


  })
})
})