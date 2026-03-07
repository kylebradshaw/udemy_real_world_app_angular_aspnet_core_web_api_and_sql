import { CategoryService } from './../services/category-service';
import { inject, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss',
})
export class AddCategory {
// 1. import ReactiveFormsModule
// 2. form groups -> form controls
  private categoryService = inject(CategoryService);

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    urlHandle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  })

  onSubmit(): void {
    console.log(this.addCategoryFormGroup.getRawValue());
    this.categoryService.addCategory(this.addCategoryFormGroup.getRawValue());
  }

  get nameFormControl(): FormControl<string> {
    return this.addCategoryFormGroup.controls.name as FormControl<string>;
  }

  get urlHandleFormControl(): FormControl<string> {
    return this.addCategoryFormGroup.controls.urlHandle as FormControl<string>;
  }
}
