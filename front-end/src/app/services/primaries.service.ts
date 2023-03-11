import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Primary, SupplierOfPrimary } from '../types/Primary';

@Injectable({
  providedIn: 'root'
})
export class PrimariesService {
  private URL: string = "http://localhost:4201/api";

  constructor(private http: HttpClient) { }

  getPrimaries(){
    return this.http.get<Primary[]>(this.URL + "/get-primaries");
  }
  getPrimaryWithSuppliers(id: number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", 4)
    return this.http.get<SupplierOfPrimary[]>(this.URL + "/get-primary-with-suppliers", {params: queryParams});
  }
}
