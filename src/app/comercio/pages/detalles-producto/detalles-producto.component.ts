import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})


export class DetallesProductoComponent {
  id:number = 0;
  constructor(private router: ActivatedRoute){}

  ngOnInit(){
    this.id = this.router.snapshot.params['id'];
    console.log(this.id)
  }
  
}

