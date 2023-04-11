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
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    // headers.append("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    // headers.append("Allow: GET, POST, OPTIONS, PUT, DELETE");

    const values = {
      'campo': 'valor'
    }
    const requestOptions = {
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Allow': 'GET, POST, OPTIONS, PUT, DELETE',
      },
      responseType: JSON.parse('"text"')
    };
    return this.http.post('http://localhost:8080/producto/getList', values ,requestOptions);
  }
}
