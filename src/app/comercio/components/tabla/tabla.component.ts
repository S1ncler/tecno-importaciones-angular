import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TiendaService } from '../../services/tienda.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    public tiendaService: TiendaService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.tiendaService.traerTodosProductos().subscribe((data) => {
      const datos = JSON.parse(JSON.stringify(data));
      this.tiendaService.ELEMENT_DATA = [];
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

  delete(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: `Desea eliminar el elemento: ${element.name}, con ID: ${element.id}`
    })
    dialogRef.afterClosed().subscribe(ref => {
      if (ref)
        this.tiendaService.eliminarProducto(element.id);
    })
    this.getAllProducts();
  }

  editar(id: number): void {
    this.tiendaService.traerUnProducto(id);
    this.tiendaService.mostrarFormulario(true, true);    
    this.getAllProducts();
  }

  crear(): void {
    this.tiendaService.productoFormulario = {
      id: 0,
      name: '',
      marca: '',
      descripcion: '',
      price: 0,
      image: [""],
      categoria: '',
      stock: 0
    }
    this.tiendaService.mostrarFormulario(true, false)
  }
}
