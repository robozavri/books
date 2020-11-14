import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import {IvyCarouselModule} from 'angular-responsive-carousel';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    IvyCarouselModule,
    HomeRoutingModule,
    CommonModule,
    SharedModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule { }

