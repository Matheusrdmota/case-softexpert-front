export class Person{
  name: string
  value: number
  paymentLink: string
  friend: boolean

  constructor(name: string, value: number, paymentLink: string, friend: boolean){
    this.name = name;
    this.value = value;
    this.paymentLink = paymentLink;
    this.friend = friend;
  }
}
