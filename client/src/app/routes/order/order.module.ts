import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [OrderComponent],
  imports: [
    OrderRoutingModule,
    CommonModule,
    SharedModule,
  ],
  exports: [OrderComponent]
})
export class OrderModule { }
