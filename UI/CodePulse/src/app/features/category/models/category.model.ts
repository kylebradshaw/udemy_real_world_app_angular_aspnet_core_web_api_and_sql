export interface AddCategoryRequest {
  name: string;
  urlHandle: string;
}

export interface UpdateCategoryRequest extends AddCategoryRequest {
  id?: string;
}

export interface Category {
  id?: string;
  name: string;
  urlHandle: string;
}
