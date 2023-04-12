import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {
    console.log('Servicio Http');
   }

  getProducts(): any {
    return this.http.get('http://localhost:8080/producto/getList');
  }
}
