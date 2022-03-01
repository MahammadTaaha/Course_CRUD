import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { CourselistComponent } from './courselist/courselist.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UpdatecourseComponent } from './updatecourse/updatecourse.component';

const routes: Routes = [
  {path:'',component:CourselistComponent},
  {path:'courses',component:CourselistComponent},
  {path:'addcourse',component:AddcourseComponent},
  {path:'updatecourse/:id',component:UpdatecourseComponent},
  {path:'notfound',component:NotfoundComponent},
  {path:'**',redirectTo:'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
