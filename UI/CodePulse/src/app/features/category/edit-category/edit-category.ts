import { Component, effect, input, inject } from '@angular/core';
import { CategoryService } from './../services/category-service';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/category.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-edit-category',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.scss',
})
export class EditCategory {
  id = input<string>();
  private categoryService = inject(CategoryService);
  private router = inject(Router)


  categoryResourceRef = this.categoryService.getCategoryById(this.id);
  categoryResponse = this.categoryResourceRef.value; // signal

  constructor() {
    // use effect signal to track the changes
    effect(() => {
      console.log(this.categoryService.requestStatus());
      if (this.categoryService.requestStatus() === 'success') {
        this.categoryService.requestStatus.set('idle');
        this.router.navigate(['/admin','categories']);
      } else if (this.categoryService.requestStatus() === 'error') {
        console.error('Error updating category');
      }
    });
  }


  editCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    urlHandle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  })

  get nameFormControl(): FormControl<string> {
    return this.editCategoryFormGroup.controls.name as FormControl<string>;
  }

  get urlHandleFormControl(): FormControl<string> {
    return this.editCategoryFormGroup.controls.urlHandle as FormControl<string>;
  }

  effectRef = effect(() => {
    console.log(this.categoryResponse());
    const category = this.categoryResponse();
    if (category) {
      this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name ?? '');
      this.editCategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle ?? '');
    }
  });

  onSubmit(): void {
    console.log(this.editCategoryFormGroup.getRawValue());

    const editCategoryFormValue = this.editCategoryFormGroup.getRawValue() as UpdateCategoryRequest;
    editCategoryFormValue['id'] = this.id();
    const updateCategoryRequestDto: UpdateCategoryRequest = {
      id: this.id(),
      name: editCategoryFormValue.name,
      urlHandle: editCategoryFormValue.urlHandle,
    }

    this.categoryService.updateCategory(updateCategoryRequestDto);

  }
}
