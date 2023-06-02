import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'brand',
    'price',
    'stock',
    'options',
  ];
  dataSource: any;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public tiendaService: TiendaService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.tiendaService.traerTodosProductos().subscribe((data) => {
      const datos = JSON.parse(JSON.stringify(data));
      for (let dato of datos) {
        this.tiendaService.ELEMENT_DATA.push({
          id: dato.id,
          name: dato.name,
          marca: dato.marca,
          price: dato.price,
          stock: dato.stock,
        });
      }
      this.dataSource = new MatTableDataSource(this.tiendaService.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  delete(id: number) {
    console.log('Se va a eliminar el id: ', id);
    this.getAllProducts();
  }

  editar(id: number) {
    this.tiendaService.mostrarFormulario(true);
  }
}
