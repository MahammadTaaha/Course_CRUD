import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styles: [
  ]
})
export class CourselistComponent implements OnInit {

  course:Course[]|any;
  constructor(private courseService:CourseService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.courseService.GetCourses().subscribe(res=>{
      if (res.status == 200 && res.body != null) {
        this.course = res.body;
      }
      console.log(this.course);
    });
  }

  DeleteCourse(id:number){
    if(confirm("Are you sure,you want to delete?")){
      this.courseService.DeleteCourse(id).subscribe((res)=>{
        if (res.status == 200) {
          this.toastr.success("Course Deleted Successfully!");
          this.router.navigateByUrl('courses');
        }
      })
    }
  }
}
