import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../model/bill.model';
import { Observable } from 'rxjs';
import { Person } from '../model/person.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpClient: HttpClient) { }

  calculateBill(bill: Bill): Observable<Person[]>{
    let BASE_URL = "http://localhost:8080/api/v1/bill"
    return this.httpClient.post<Person[]>(BASE_URL, bill);
  }
}
