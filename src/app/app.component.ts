import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../app/services/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hulkStoreApp';
  disabledCart: any;
  productsCart: Object[];
  totalCart: any;
  message: any;
  successBuy: any;

  constructor(private productosService: ProductosService){}

  ngOnInit(): void {
    this.disabledCart = false;
    this.totalCart = 0;
  }

  toggleDisabledCart(){
    this.disabledCart = !this.disabledCart;
    this.productsCart = JSON.parse(sessionStorage.getItem('productos'));
    this.updateTotal();
  }

  updateTotal(){
    this.totalCart = 0;
    if (this.productsCart){
      this.productsCart.forEach(element => {
        this.totalCart = this.totalCart + (element['precio'] * element['cantidad']);
      });
    }
  }

  remove(prod){
    if (prod.cantidad != 0){
      prod.cantidad =  prod.cantidad - 1;
      this.updateTotal();
    }
    if (prod.cantidad == 0){
      var index = this.productsCart.findIndex(item => item['id'] === prod.id);
      this.productsCart.splice(index,1);
      sessionStorage.setItem('productos', JSON.stringify(this.productsCart));
    }
  }

  add(prod){
    if (prod.cantidad < prod.stock){
      prod.cantidad =  prod.cantidad + 1;
      this.updateTotal();
    }
  }

  compra(){
    this.productosService.compra(this.productsCart).subscribe(arg => this.validarCompra(arg));
  }

  validarCompra(isOk){
    if (isOk){
      alert("Compra exitosa");
      location.reload();
    } else{
      alert("Hubo un error realizando la compra");
    }
  }
}
