import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from "../../../shared/models/category.model"
import {Product} from "../../../shared/models/product.model"


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://fakestoreapi.com';
  constructor(private http: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/products/categories`);
  }

  getProductsByCategory(category: Category): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${category}`);
  }
}
