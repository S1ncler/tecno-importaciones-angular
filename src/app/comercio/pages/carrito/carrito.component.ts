import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  //lista de productos recibida por el localhost 
  arrayProductos: any[] = [];
  //precio sumado de todos los productos (sin iva)
  subtotal: number = 0
  // 19% del precio total de los productos
  iva: number = 0
  // suma del subtotal y el iva
  total: number = 0
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
  
  removeProduct(data:object){
    let i=-1
    for (let item of this.arrayProductos){
      i+=1
      if (item == data){
        this.arrayProductos.splice(i,1)
      }
    }
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito" , JSON.stringify(this.arrayProductos))
    this.subtotal=0
    this.iva=0
    this.total=0
    this.ngOnInit()
  }

  addProduct(data:object){
    for (let item of this.arrayProductos){
      if (item == data){
        if (!item.repetidos){
          item.repetidos = 2;
        }else item.repetidos = item.repetidos += 1
      }
    }
    
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito" , JSON.stringify(this.arrayProductos))
    this.subtotal=0
    this.iva=0
    this.total=0
    this.ngOnInit()
  }

  substractProduct(data:object){
    for (let item of this.arrayProductos){
      if (item == data){
        if (item.repetidos){
          item.repetidos = item.repetidos - 1
        }
      }
    }
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito" , JSON.stringify(this.arrayProductos))
    this.subtotal=0
    this.iva=0
    this.total=0
    this.ngOnInit()
  }

}
