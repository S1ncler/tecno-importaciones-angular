import { Component } from '@angular/core';

@Component({
  selector: 'app-acordeon',
  templateUrl: './acordeon.component.html',
  styleUrls: ['./acordeon.component.css']
})
export class AcordeonComponent {
  items = [
    { title: 'Item 1', content: 'Content 1', open: false },
    { title: 'Item 2', content: 'Content 2', open: false },
    { title: 'Item 3', content: 'Content 3', open: false }
  ];

  toggleItem(item: any) {
    item.open = !item.open;
  }
}
