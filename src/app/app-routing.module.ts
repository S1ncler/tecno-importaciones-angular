import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './paginas-principales/pages/page404/page404.component';
import { DetallesProductoComponent } from './comercio/pages/detalles-producto/detalles-producto.component';

const routes: Routes = [
  {
    path: 'comercio',
    loadChildren: () =>
      import('./comercio/comercio.module').then((m) => m.ComercioModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./login-registro/login-registro.module').then(
        (m) => m.LoginRegistroModule
      ),
  },
  {
    path: 'detalles-producto',
    loadChildren: () =>
    import('./comercio/pages/detalles-producto/detalles-producto.component')
    .then (  (m) => m.DetallesProductoComponent),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import('./paginas-principales/paginas-principales.module').then(
        (m) => m.PaginasPrincipalesModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./paginas-principales/paginas-principales.module').then(
        (m) => m.PaginasPrincipalesModule
      ),
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
