import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // call .net core web api to get categories
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:5000/api';

  addCategory(payload: AddCategoryRequest): void {
    this.http.post(`${this.apiBaseUrl}/categories`, payload).subscribe({
      next: (response) => {
        console.log('Category added successfully', response);
      },
      error: (error) => {
        console.error('Error adding category', error);
      }
    });
  }
}
