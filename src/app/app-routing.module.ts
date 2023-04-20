import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ FormPageComponent } from 'src/app/Modules/form/pages/form-page/form-page.component'

const routes: Routes = [
  {
    path: '',
    component: FormPageComponent,
    loadChildren:() => import(`./Modules/form/form.module`) .then(m => m.FormModule)

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
