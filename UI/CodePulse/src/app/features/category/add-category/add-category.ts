import { CategoryService } from './../services/category-service';
import { inject, Component, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category.model';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss',
})
export class AddCategory {
  private categoryService = inject(CategoryService);
  // 1. import ReactiveFormsModule
  // 2. form groups -> form controls

  constructor() {
    // use effect signal to track the changes
    effect(() => {
      console.log(this.categoryService.addCategoryStatus());
      if (this.categoryService.addCategoryStatus() === 'success') {
        console.log('Category added successfully');
        this.addCategoryFormGroup.reset();
      } else if (this.categoryService.addCategoryStatus() === 'error') {
        console.error('Error adding category');
      }
    });
  }

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    urlHandle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  })

  onSubmit(): void {
    console.log(this.addCategoryFormGroup.getRawValue());

    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();
    const addCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryFormValue.name,
      urlHandle: addCategoryFormValue.urlHandle,
    }

    this.categoryService.addCategory(addCategoryRequestDto);

  }

  get nameFormControl(): FormControl<string> {
    return this.addCategoryFormGroup.controls.name as FormControl<string>;
  }

  get urlHandleFormControl(): FormControl<string> {
    return this.addCategoryFormGroup.controls.urlHandle as FormControl<string>;
  }
}
