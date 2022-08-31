import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-obejct/Address";

const customer = CustomerFactory.createWithAddress("John", new Address("street", 123, "zip", "city"))

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street Updated",
    city: "City Updated",
    zip: "Zip Updated",
    number: 1234,
  }
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn().mockReturnValue(Promise.resolve(input)),
  }
}

describe("Unit test for customer update use case", () => {

  it("should call repository.update", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input)
  })
})