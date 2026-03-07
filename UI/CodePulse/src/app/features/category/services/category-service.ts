import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // call .net core web api to get categories
  private http = inject(HttpClient);
  private apiBaseUrl = 'http://localhost:5000/api';

  addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle'); // TS union types

  addCategory(payload: AddCategoryRequest): void {
    this.addCategoryStatus.set('loading');
    this.http.post(`${this.apiBaseUrl}/categories`, payload).subscribe({
      next: (response) => {
        this.addCategoryStatus.set('success');
      },
      error: (error) => {
        this.addCategoryStatus.set('error');
      }
    });
  }
}
