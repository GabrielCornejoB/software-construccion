import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Primary, SupplierOfPrimary } from '../types/Primary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrimariesService {
  private URL: string = "http://localhost:4201/api";

  constructor(private http: HttpClient) { }

  getPrimaries(): Observable<Primary[]> {
    return this.http.get<Primary[]>(this.URL + "/get-primaries");
  }
  getSuppliersOfPrimary(id: string): Observable<any> {
    return this.http.get(this.URL + "/get-suppliers-of-primary/" + id);
  }
  getPrimary(id: string): Observable<any> {
    return this.http.get<Primary>(this.URL + "/get-primary/" + id);
  }
  createPrimary(primary: Primary): Observable<any>{
    return this.http.post(this.URL + "/add-primary/", primary);
  }
  deletePrimary(id: string): Observable<any> {
    return this.http.delete(this.URL + "/delete-primary/" + id);
  }
  updatePrimary(id: string, primary: Primary): Observable<any> {
    return this.http.put(this.URL + "/update-primary/" + id, primary);
  }
  addSupplierToPrimary(id: string, supplier: SupplierOfPrimary): Observable<any> {
    return this.http.post(this.URL + "/add-supplier-to-primary/" + id + "/" + supplier.supplierId, supplier);
  }
}
