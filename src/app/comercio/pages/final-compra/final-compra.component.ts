import { Component } from '@angular/core';
import { NavBarService } from 'src/app/Shared/services/nav-bar.service';
import { FinalizarService } from '../../services/finalizar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-final-compra',
  templateUrl: './final-compra.component.html',
  styleUrls: ['./final-compra.component.css'],
})
export class FinalCompraComponent {
  [x: string]: any;

  constructor(
    public navBarService: NavBarService,
    public finalizarService: FinalizarService,
    private router: Router
  ) {}
  arrayProductos: any[] = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  precios: string[] = [];
  opcionSeleccionada: string []= [];
  

  ngOnInit() {
    //se recurpera la informacion del local storage
    let entrada = localStorage.getItem('carrito');

    //si la informacion es valida, se convierte de string a objeto
    if (entrada) {
      this.arrayProductos = JSON.parse(entrada);
      //se lanza error si la informacion es invalida
    } else {
      return console.log('El valor es nulo o indefinido');
    }

    //se suman los precios de los productos
    for (let item of this.arrayProductos) {
      this.precios.push(`${item.name},${item.price}`);
      if (item.repetidos) {
        this.subtotal = this.subtotal + item.price * item.repetidos;
      } else this.subtotal = this.subtotal + item.price;
    }
    this.subtotal = Math.round(this.subtotal);
    //se obtiene el iva
    this.iva = Math.round(this.subtotal * 0.19);
    //se obtiene el total
    this.total = Math.round(this.subtotal + this.iva);
    this.finalizarService.getUser();
  }
  alert1() {
    let factura = JSON.parse(localStorage.getItem('factura') || '');
    factura['precios'] = this.precios;
    this.finalizarService
      .finishBuy(
        JSON.stringify(factura),
        this.arrayProductos,
        this.finalizarService.email
      )
      .subscribe((res) => {
        let ok = false;
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.msg === 'Compra realizada correctamente') ok = true;
        else ok = false;
        if (ok) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Gracias por su compra',
            showConfirmButton: false,
            timer: 2500,
          });
          localStorage.removeItem('carrito');
          localStorage.removeItem('factura');
          this.navBarService.removeFromCart(this.arrayProductos);
          this.router.navigate(['principal/home']);
        } else if(res2.msg === 'sin stock') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay stock de los productos que deseas comprar',
            showConfirmButton: false,
            timer: 2500,
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al realizar la compra',
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  }

  verificarSeleccion() {
    let opcionSeleccionada = document.querySelector('input[name="direccion1"]:checked');
    if (this.opcionSeleccionada) {
      // La opción está seleccionada, puedes continuar con el envío
      // Aquí puedes agregar tu lógica adicional si es necesario
      
      console.log("Opción seleccionada: " + this.opcionSeleccionada);
    } else {
      // La opción no está seleccionada, muestra un mensaje de error o realiza alguna acción
      console.log("Debes seleccionar una opción antes de enviar.");
    }
  }
}
