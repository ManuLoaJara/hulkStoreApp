import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {}

  getProducts(): any {
    return this.http.get('http://localhost:8080/producto/getList');
  }

  compra(values): any {
    return this.http.post('http://localhost:8080/producto/compra', values);
  }
}
