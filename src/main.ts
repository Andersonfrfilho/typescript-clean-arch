import Order from "./domain/checkout/entity/Order";
import OrderItem from "./domain/checkout/entity/Order_Item";
import Customer from "./domain/customer/entity/Customer";
import Address from "./domain/customer/value-obejct/Address";



let customer = new Customer("123", "anderson fernandes");
const address = new Address("Rua dois", 2, "12345-678", "Franca");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 2", 10, "p1", 10);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 15);

const order = new Order("1", "123", [item1, item2])