import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-obejct/Address";

const customer1 = CustomerFactory.createWithAddress('John Doe', new Address('street', 1, '12345', 'city'))

const customer2 = CustomerFactory.createWithAddress('Jane Doe', new Address('street 2', 2, '123456', 'city 2'))

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test for list customer use case', () => {
  it("should list a customer", async () => {
    const repository = new MockRepository();
    const useCase = new ListCustomerUseCase(repository);

    const output = await useCase.execute();

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.Address.Street)
  })
})