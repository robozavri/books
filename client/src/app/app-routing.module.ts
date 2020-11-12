import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  canActivate: [],
  children: [
    {
      path: 'home',
      loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'order',
      loadChildren: () => import('./routes/order/order.module').then(m => m.OrderModule)
    },
  ]
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
