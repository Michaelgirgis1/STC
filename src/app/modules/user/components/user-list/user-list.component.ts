import { Component } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';

import { Title } from '@angular/platform-browser';


import {CategoryService} from '../../services/category.service'
import { Category } from './../../../../shared/models/category.model';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filterText: string = '';
  selectedCategory: any = [];
  isloaderShown = false;
  isEmpty = false;
  constructor(private categoryService :CategoryService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('User List');
    this.getCategreies();

  }
  getCategreies() {
    this.isloaderShown = true;
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        if (categories.length > 0) {
          this.selectedCategory  =  categories[0]
          this.selectCategory(categories[0]);
        }
        this.isloaderShown = false

      },
      error => {
        this.isloaderShown = false

        console.log('Error fetching categories:', error);
      }
    );
  }


  selectCategory(category:any) {
    this.categoryService.getProductsByCategory(category).subscribe(
      products => {
        this.products = products;
        this.applyFilter();
      },
      error => {
        console.log('Error fetching products:', error);
      }
    );
  }
  changeCategory()  {
    this.selectCategory(this.selectedCategory.toLowerCase());

  }
  applyFilter() {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.filterText.toLowerCase())
      );
      if (this.filteredProducts.length === 0) this.isEmpty = true;
      else this.isEmpty = false;
  }
  getGridColumns(): number {
    if (window.innerWidth <= 767) { // Mobile devices
      return 1;
    } else if (window.innerWidth <= 1023) { // Tablet devices
      return 2;
    } else { // Desktop devices
      return 3;
    }
  }
}
