import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ComercioRoutingModule } from './comercio-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { SquareCardComponent } from './components/square-card/square-card.component';
import { HorizontalCardComponent } from './components/horizontal-card/horizontal-card.component';
import { AsideComponent } from './components/aside/aside.component';
import { AsideCollapseComponent } from './components/aside-collapse/aside-collapse.component';
import { FormsModule } from '@angular/forms';
import { TiendaService } from './services/tienda.service';
import { AdministrarProductosComponent } from './pages/administrar-productos/administrar-productos.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DetallesProductoComponent } from './pages/detalles-producto/detalles-producto.component';
import { FinalCompraComponent } from './pages/final-compra/final-compra.component'

@NgModule({
  declarations: [
    TiendaComponent,
    SquareCardComponent,
    HorizontalCardComponent,
    AsideComponent,
    AsideCollapseComponent,
    AdministrarProductosComponent,
    TablaComponent,
    FormularioComponent,
    ConfirmDialogComponent,
    DetallesProductoComponent,
    FinalCompraComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ComercioRoutingModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [TiendaService],
})
export class ComercioModule {}
