import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {
  ngOnInit(){
    window.scrollTo(0, 0);
  }
  public mostrarInfo1: boolean = false;
  public mostrarInfo2: boolean = false;
  public mostrarInfo3: boolean = false;
  public mostrarInfo4: boolean = false;
  public mostrarInfo5: boolean = false;
  public mostrarInfo6: boolean = false;
  public mostrarInfo7: boolean = false;
  public mostrarInfo8: boolean = false;

  public toggleInfo(info: string): void {
    switch (info) {
      case 'info1':
        this.mostrarInfo1 = !this.mostrarInfo1;
        break;
      case 'info2':
        this.mostrarInfo2 = !this.mostrarInfo2;
        break;
      case 'info3':
        this.mostrarInfo3 = !this.mostrarInfo3;
        break;
      case 'info4':
        this.mostrarInfo4 = !this.mostrarInfo4;
        break;
      case 'info5':
        this.mostrarInfo5 = !this.mostrarInfo5;
        break;
      case 'info6':
        this.mostrarInfo6 = !this.mostrarInfo6;
        break;
      case 'info7':
        this.mostrarInfo7 = !this.mostrarInfo7;
        break;
      case 'info8':
        this.mostrarInfo8 = !this.mostrarInfo8;
        break;
      default:
        break;
    }
  }
}
