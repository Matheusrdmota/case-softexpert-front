import { Fee } from "./fee.model";
import { Item } from "./item.model";

export class Bill {
  foodsList: Item[]
  feesList: Fee[]

  constructor(_foodsList: Item[], _feesList: Fee[]){
    this.foodsList = _foodsList
    this.feesList = _feesList
  }
}
