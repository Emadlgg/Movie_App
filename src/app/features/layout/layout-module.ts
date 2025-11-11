import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainLayoutComponent,
    NavbarComponent
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class LayoutModule { }