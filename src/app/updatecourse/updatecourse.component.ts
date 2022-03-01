import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';
import { Course } from '../models/course';
import { Mentor } from '../models/mentor';
import { CategoryService } from '../services/category.service';
import { CourseService } from '../services/course.service';
import { MentorService } from '../services/mentor.service';

@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styles: [
  ]
})
export class UpdatecourseComponent implements OnInit {
  courseId: number | undefined;
  course: Course;
  category: Category[] | any;
  mentor: Mentor[] | any;
  cForm: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService, private mentorService: MentorService, private categoryService: CategoryService, 
    private router: Router, private route: ActivatedRoute,private toastr:ToastrService) {
    this.course = new Course();

    this.cForm = this.fb.group({
      id: [0],
      name: [null, Validators.required],
      summary: [null, [Validators.required]],
      description: [null, Validators.required],
      difficultyType: ['', Validators.required],
      unitPrice: [null, Validators.required],
      categoryId: ['', Validators.required],
      mentorId: ['', Validators.required],
      url: [null, Validators.required],
      imageurl: ['', Validators.required],
      demourl: ['', Validators.required],
      isActive: [false, []],
      sequence: [null, Validators.required]
    });
  }


  ngOnInit(): void {

    this.route.params.subscribe((record) => {
      this.courseId = record['id'];
    });

    this.categoryService.GetCategories().subscribe(res => {
      this.category = res.body;
    })

    this.categoryService.GetCategories().subscribe(res => {
      this.mentor = res.body;
    })

    this.courseService.GetCourseById(this.courseId).subscribe((record) => {
      let course = record.body;
      this.cForm.controls['id'].setValue(course?.id);
      this.cForm.controls['categoryId'].setValue(course?.categoryId);
      this.cForm.controls['mentorId'].setValue(course?.mentorId);
      this.cForm.controls['name'].setValue(course?.name);
      this.cForm.controls['summary'].setValue(course?.summary);
      this.cForm.controls['description'].setValue(course?.description);
      this.cForm.controls['difficultyType'].setValue(course?.difficultyType);
      this.cForm.controls['unitPrice'].setValue(course?.unitPrice);
      this.cForm.controls['url'].setValue(course?.url);
      this.cForm.controls['demourl'].setValue(course?.demoUrl);
      this.cForm.controls['imageurl'].setValue(course?.imageUrl);
      this.cForm.controls['sequence'].setValue(course?.sequence);
      this.cForm.controls['isActive'].setValue(course?.isActive);
    })
  }

  UpdateCourse() {
    if (this.cForm.valid) {
      if (this.cForm.value.id > 0) {
        console.log(this.cForm.value);
        this.courseService.UpdateCourse(this.cForm.value).subscribe((res) => {
          if (res.status == 200) {
            this.toastr.success("Course Updated successfully!");
            this.router.navigateByUrl('/');
          }
        })
      }
    }
  }

}
