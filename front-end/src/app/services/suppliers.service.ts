import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierOfPrimary } from '../types/Primary';
import { Supplier } from '../types/Supplier';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private URL: string = "http://localhost:4201/api";

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<any> {
    return this.http.get<SupplierOfPrimary>(this.URL + "/get-suppliers");
  }

  addSupplier(supplier: Supplier): Observable<any> {
    return this.http.post(this.URL + "/add-supplier", supplier);
  }

  getSupplier(id: string): Observable<any> {
    return this.http.get(this.URL + '/get-supplier/' + id);
  }

  updateSupplier(id: string, supplier: Supplier): Observable<any> {
    return this.http.put(this.URL + '/update-supplier/' + id, supplier);
  }
}
