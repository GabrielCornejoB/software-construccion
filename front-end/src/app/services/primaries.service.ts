import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Primary } from '../types/Primary';

@Injectable({
  providedIn: 'root'
})
export class PrimariesService {
  private URL: string = "http://localhost:4201/api";

  constructor(private http: HttpClient) { }

  getPrimaries() {
    return this.http.get<Primary[]>(this.URL + "/get-primaries");
  }
}
