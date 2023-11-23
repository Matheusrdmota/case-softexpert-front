import { Person } from './model/person.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Item } from './model/item.model';
import { Fee } from './model/fee.model';
import { Bill } from './model/bill.model';
import { BillService } from './core/bill-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-case-se';
  form: FormGroup;
  isFriend: any[] = [];
  isHidden: boolean[] = [];
  @ViewChild("amigo", {static: false}) friendInput: ElementRef;
  error: boolean = false;

  itemsList: Item[] = [];
  feesList: Fee[] = [];

  calculatedBill: Person[] = [];
  displayedColumns: string[] = ['name', 'value', 'paymentLink']

  constructor(
    private fb: FormBuilder,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      items: this.fb.array([]),
      fees: this.fb.array([])
    })
  }

  items(): FormArray {
    return this.form.get("items") as FormArray
  }

  fees(): FormArray {
    return this.form.get("fees") as FormArray
  }

  newItem(): FormGroup{
    return this.fb.group({
      foodName: "",
      value: "",
      isFriend: "",
      owner: ""
    })
  }

  newFee(): FormGroup{
    return this.fb.group({
      description: "",
      feeType: "",
      valueType: "",
      value: ""
    })
  }

  addItem(){
    this.items().push(this.newItem());
    this.isHidden.push(true);
    this.isFriend.push(false);
  }

  addFee(){
    this.fees().push(this.newFee());
  }

  onSubmit(){
    console.log(this.form.value)
    let itemsArr = this.form.value.items as Array<any>;
    itemsArr.forEach(val => {
      let person = new Person(val.isFriend == "true" ? val.owner : "", 0, "", val.isFriend == "true") as Person
      this.itemsList.push({
        foodName: val.foodName,
        value: val.value,
        owner: person
      })
    })

    let feesArr = this.form.value.fees as Array<any>;
    feesArr.forEach(val => {
      this.feesList.push({
        description: val.description,
        feeType: val.feeType,
        valueType: val.valueType,
        value: val.value
      })
    })

    let bill: Bill = new Bill(this.itemsList, this.feesList)
    this.error = false
    this.billService.calculateBill(bill).subscribe(x => {
      if(x && x.length > 0){
        this.calculatedBill = x;
        this.itemsList = []
        this.feesList = []
      }
    }, (error) => {
      this.itemsList = []
      this.feesList = []
      this.error = true;
    })
  }

  onSelectionChange(event: any, index: any){
    if(this.isFriend[index] == "true"){
      this.isHidden[index] = false;
    }else{
      this.isHidden[index] = true;
      this.friendInput.nativeElement.value = ""
    }
  }
}
