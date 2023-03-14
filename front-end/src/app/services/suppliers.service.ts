import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierOfPrimary } from '../types/Primary';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private URL: string = "http://localhost:4201/api";

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<any> {
    return this.http.get<SupplierOfPrimary>(this.URL + "/get-suppliers");
  }
}
