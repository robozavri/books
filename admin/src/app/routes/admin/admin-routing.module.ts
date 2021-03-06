import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuardService } from './admin-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'info',
    pathMatch: 'full',
    canActivate: [AdminGuardService],
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: 'meta',
        loadChildren: './routes/meta/meta.module#MetaModule'
      },
      {
        path: 'categories',
        loadChildren: './routes/categories/categories.module#CategoriesModule'
      },
      {
        path: 'book/:id',
        loadChildren: './routes/book/book.module#BookModule'
      },
      {
        path: 'books',
        loadChildren: './routes/books/books.module#BooksModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
