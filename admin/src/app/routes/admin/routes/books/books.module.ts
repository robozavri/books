import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [],
})
export class BooksModule { }
