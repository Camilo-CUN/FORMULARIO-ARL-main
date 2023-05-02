import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormRoutingModule } from './form-routing.module';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './pages/loading/loading.component';

@NgModule({
  declarations: [
    FormPageComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    HttpClientModule,
    FormsModule
    
  ]
})
export class FormModule { }
