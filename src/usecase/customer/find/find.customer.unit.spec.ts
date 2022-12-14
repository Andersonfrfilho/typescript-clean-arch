import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/Customer";
import Address from "../../../domain/customer/value-obejct/Address";
import Product from "../../../domain/product/entity/Product";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/model/product.model";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Anderson Fernandes");

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Test find customer use case', () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository)

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

  it("should not find a customers", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found")
    })
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123'
    }
    expect(() => {
      return FindCustomerUseCase.execute(input);
    }).rejects.toThrow("Customer not found")

  })
})