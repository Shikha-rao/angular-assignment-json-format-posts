import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormatJsonComponent } from './format-json/format-json.component';
import { DisplayPostComponent } from './display-post/display-post.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/display' },

  {
    path: 'format',
    component: FormatJsonComponent,
  },
  {
    path: 'display',
    component: DisplayPostComponent,
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
