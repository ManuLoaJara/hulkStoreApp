import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private productosService: ProductosService){
    console.log('ProductosComponent Creado');
  }

  ngOnInit(): void {
    console.log('ProductosComponent inicializado');
    this.productosService.getProducts()
      .subscribe(arg => console.log(arg));
  }

}
