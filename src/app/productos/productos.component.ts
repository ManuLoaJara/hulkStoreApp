import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Object[];
  productsCart: Object[];

  constructor(
    private productosService: ProductosService,
    private appComponent: AppComponent
  ){ }

  ngOnInit(): void {
    this.productosService.getProducts().subscribe(arg => this.productos = arg);
    this.productsCart = [];
    sessionStorage.clear();
  }

  addCart(param) {
    param['cantidad'] = 1;
    var obj = sessionStorage.getItem('productos');
    if (obj != null){
      this.productsCart = JSON.parse(obj);
    }
    this.productsCart.push(param);
    sessionStorage.setItem('productos', JSON.stringify(this.productsCart));
    this.appComponent.toggleDisabledCart();
  }

}
