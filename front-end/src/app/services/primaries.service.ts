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
  getPrimaryWithSuppliers(id: string){
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("id", id)
    return this.http.get<SupplierOfPrimary[]>(this.URL + "/get-suppliers-of-primary/" + id);
  }
  getPrimary(id: any): Observable<Primary> {
    return this.http.get<Primary>(this.URL + "/get-primary/" + id);
  }
}
