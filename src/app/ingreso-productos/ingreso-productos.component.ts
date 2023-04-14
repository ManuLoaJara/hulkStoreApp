import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso-productos',
  templateUrl: './ingreso-productos.component.html',
  styleUrls: ['./ingreso-productos.component.css'],
})
export class IngresoProductosComponent implements OnInit {
  form: FormGroup;
  variableTipoProducto = 'TIPO_PRODUCTO';
  tiposProducto: any;
  imgBase64: any;
  esNuevo: any;
  productos: Object[];
  precio: any;
  stock: any;
  idTipo: any;

  constructor(private productosService: ProductosService,
    private appComponent: AppComponent,
    private router: Router) {
    this.form = new FormGroup({
      referencia: new FormControl(),
      idTipo: new FormControl(),
      precio: new FormControl(),
      cantidad: new FormControl(),
      stock: new FormControl(),
      esNuevo: new FormControl()
    });
  }

  ngOnInit(): void {
    this.imgBase64 = 'assets/images/noPhoto.jpg';
    this.tiposProducto = [];
    this.esNuevo = true;
    this.precio = null;
    this.stock = null;
    this.idTipo = null;
    this.productosService
      .getVariablesByCategory(this.variableTipoProducto)
      .subscribe((arg) => (this.tiposProducto = arg));
    this.productosService
      .getProducts()
      .subscribe((arg) => (this.productos = arg));
  }

  submit(values) {
    if (this.esNuevo){
      values['precio'] = this.form.controls.precio.value;
      values['idTipo'] = this.form.controls.idTipo.value;
    } else{
      values['precio'] = this.precio;
      values['idTipo'] = this.idTipo;
      values['stock'] = this.stock;
    }
    values['imagenBase64'] = this.imgBase64;
    this.productosService
      .addProduct(values)
      .subscribe((arg) => {
        alert('Se ingresó correctamente el producto ' + values.referencia);
        this.router.navigate(['/productos']);
      });
  }

  setEsNuevo(value){
    this.esNuevo = value;
  }

  getInfo(idProd){
    const producto = this.productos.find(item => item['id'] == idProd);
    this.precio = producto['precio'];
    this.stock = producto['stock'];
    this.idTipo = producto['idTipo'];
    this.imgBase64 = producto['imagenBase64'];
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.imgBase64 = reader.result;
    };
  }
}
