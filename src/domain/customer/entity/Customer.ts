import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "./Address";

// 
export default class Customer extends Entity {
  // entidade anêmica
  private _name: string;
  private _address!: Address;
  private _active: boolean;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this._active = false;
    this.validade();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }


  get name(): string { return this._name; }

  get address(): string { return `${this._address._city}, ${this._address._street} - ${this._address._number}`; }

  get rewardPoints(): number { return this._rewardPoints }



  changeName(name: string) {
    this._name = name;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set Address(address: Address) {
    this._address = address
  }

  get Address(): Address { return this._address }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoint(points: number) {
    this._rewardPoints += points;
  }

  validade() {
    CustomerValidatorFactory.create().validate(this)
  }
}