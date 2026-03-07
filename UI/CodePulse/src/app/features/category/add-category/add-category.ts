import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  addCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    urlHandle: new FormControl<string>('', { nonNullable: true })
  })

  onSubmit(): void {
    console.log(this.addCategoryFormGroup.getRawValue());
  }
}
