import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest, Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // call .net core web api to get categories
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  requestStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle'); // TS union types

  addCategory(payload: AddCategoryRequest): void {
    this.requestStatus.set('loading');
    this.http.post(`${this.apiBaseUrl}/categories`, payload).subscribe({
      next: (response) => {
        this.requestStatus.set('success');
      },
      error: (error) => {
        this.requestStatus.set('error');
      }
    });
  }

  getAllCategories() {
    return httpResource<Category[]>(() => `${this.apiBaseUrl}/categories`); // we don't need to subscribe to this, has signals we can leverage
  }
}
