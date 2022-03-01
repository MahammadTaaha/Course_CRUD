import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';
import { Mentor } from '../models/mentor';
import { CategoryService } from '../services/category.service';
import { CourseService } from '../services/course.service';
import { MentorService } from '../services/mentor.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styles: [
  ]
})
export class AddcourseComponent implements OnInit {

  category:Category[]|any;
  mentor:Mentor[]|any;
  cForm: FormGroup;
  constructor(private fb: FormBuilder, private courseService: CourseService,private categoryService:CategoryService,private mentorService:MentorService,
     private router: Router,private route: ActivatedRoute,private toastr:ToastrService) {
    this.cForm = this.fb.group({
      id: [0],
      name: [null, Validators.required],
      summary: [null, [Validators.required]],
      description: [null, Validators.required],
      difficultyType: ['', Validators.required],
      unitPrice: [null, Validators.required],
      categoryId: ['', Validators.required],
      mentorId:['',Validators.required],
      url: [null, Validators.required],
      imageurl: ['',Validators.required],
      demourl:['',Validators.required],
      isActive: [false, Validators.requiredTrue],
      sequence:[null,Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.GetCategories().subscribe(res=>{
      this.category = res.body;
    })

    this.mentorService.GetMentors().subscribe(res=>{
      this.mentor = res.body;
    })
  }

  SaveCourse(){
    this.courseService.AddCourse(this.cForm.value).subscribe(res => {
      if (res.status == 201) {
        this.toastr.success("Course Saved Successfully!");
        this.router.navigate(['/']);
      }
    });
  }

  SaveData(){
    console.log(this.cForm.value);
  }
}
