import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "comercio",
    loadChildren: () => import('./comercio/comercio.module').then(m => m.ComercioModule)
  },
  {
    path: "usuarios",
    loadChildren: () => import('./login-registro/login-registro.module').then(m => m.LoginRegistroModule)
  },
  {
    path: "principal",
    loadChildren: () => import('./paginas-principales/paginas-principales.module').then(m => m.PaginasPrincipalesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
