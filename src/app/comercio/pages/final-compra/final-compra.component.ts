import { Component } from '@angular/core';
import { NavBarService } from 'src/app/Shared/services/nav-bar.service';

@Component({
  selector: 'app-final-compra',
  templateUrl: './final-compra.component.html',
  styleUrls: ['./final-compra.component.css']
})
export class FinalCompraComponent {

  constructor (public navBarService: NavBarService){}
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
  }


  factura(){
    let factura = {
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total
    }
    localStorage.setItem("factura" , JSON.stringify(factura))
  }

}
