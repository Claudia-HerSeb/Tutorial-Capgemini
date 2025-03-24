import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Loans } from './model/Loans';
import { LoansPage } from './model/LoansPage';
import { Pageable } from '../core/model/page/Pageable';

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  private baseUrl = 'http://localhost:8080/loans';

  constructor(private http: HttpClient) {}

  getLoans(pageable: Pageable, title?: string, clientName?: string, date?: Date): Observable<LoansPage> {
    let params = new HttpParams()
      .set('page', pageable.pageNumber.toString())
      .set('size', pageable.pageSize.toString())
      .set('sort', `${pageable.sort[0].property},${pageable.sort[0].direction}`);
  
    if (title) {
      params = params.set('title', title);
    }
    if (clientName) {
      params = params.set('clientName', clientName);
    }
    if (date) {
      params = params.set('date', date.toISOString().split('T')[0]);
    }
  
    console.log('Fetching loans with params:', params.toString()); // Log params
  
    return this.http.get<LoansPage>(this.baseUrl, { params });
  }

  saveLoan(loan: Loans): Observable<void> {
    const { id } = loan;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<void>(url, loan);
  }

  deleteLoan(idLoan: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
  }
}