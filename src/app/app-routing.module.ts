import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./layouts/main-page/main-page.component";
import {WishlistComponent} from "./layouts/wishlist/wishlist.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'main/:id',
    component: MainPageComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
