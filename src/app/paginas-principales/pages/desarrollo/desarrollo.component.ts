import { Component } from '@angular/core';

@Component({
  selector: 'app-desarrollo',
  templateUrl: './desarrollo.component.html',
  styleUrls: ['./desarrollo.component.css']
})
export class DesarrolloComponent {
  ngOnInit(){
    window.scrollTo(0, 0);
  }

}
