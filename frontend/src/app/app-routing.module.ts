import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './views/home/home.component';
import {UsersCrudComponent} from './views/users-crud/users-crud.component';

const routes: Routes = [{
  path:"",
  component: HomeComponent
},
{
  path: "users",
  component: UsersCrudComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
