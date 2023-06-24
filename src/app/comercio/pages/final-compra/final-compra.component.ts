import { Component } from '@angular/core';
import { NavBarService } from 'src/app/Shared/services/nav-bar.service';
import { FinalizarService } from '../../services/finalizar.service';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-final-compra',
  templateUrl: './final-compra.component.html',
  styleUrls: ['./final-compra.component.css']
})
export class FinalCompraComponent {
  [x: string]: any;

  constructor (public navBarService: NavBarService, public finalizarService: FinalizarService){}
  arrayProductos:any[] = [];
  subtotal: number=0;
  iva:number=0;
  total:number=0;
 

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
    for (let item of this.arrayProductos){
      if(item.repetidos){
        this.subtotal = this.subtotal + item.price * item.repetidos
      } else this.subtotal = this.subtotal + item.price
    }
    this.subtotal = Math.round(this.subtotal)
    //se obtiene el iva
    this.iva= Math.round(this.subtotal*0.19) 
    //se obtiene el total
    this.total = Math.round(this.subtotal + this.iva)

    this.finalizarService.getUser()
  }


  factura(){
    let factura = {
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total
    }
    localStorage.setItem("factura" , JSON.stringify(factura))
  }
alert1(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Gracias por su compra',
    showConfirmButton: false,
    timer: 2500
  })
  const carrito = localStorage.removeItem("carrito")
  console.log(carrito);
  const vaciar = this.navBarService.removeFromCart(this.arrayProductos)
}
}
