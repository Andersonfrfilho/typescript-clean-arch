export interface InputListCustomerDto {

}
type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
  }
}
export interface OutputListCustomerDto {
  customer: Customer[];
}