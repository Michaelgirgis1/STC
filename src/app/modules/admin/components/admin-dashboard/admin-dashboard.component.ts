import { Component  } from '@angular/core';
import { ProductService } from '../../services/product.service'
import {MatDialog} from '@angular/material/dialog';
import {UpdateAddProductComponent}  from "../update-add-product/update-add-product.component"
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  products: Product[] = [];
  isloaderShown = false;
  isProductDeleting = false;
  isProductUpdating = false;
  screenWidth= 0;
  ProductDeletingId = -1;
  isPagerShow = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  tablePages = [
    {id: 1 , label: 5},
    {id: 2, label: 10},
    {id: 3 , label: 20}
  ]
  selectedPage = {id: 2, label: 10}
  constructor(private productService: ProductService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getProducts();
  }


  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }
  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }
  get endIndex(): number {
    return this.startIndex + this.itemsPerPage - 1;
  }
  get currentPageData(): any[] {
    return this.products.slice(this.startIndex, this.endIndex + 1);
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }



  get lastRenderedPage(): number {
    const lastRenderedPage = this.endIndex + 1
    if(lastRenderedPage > this.products.length) return this.products.length
    return lastRenderedPage;
  }
  getProducts(): void {
    this.isloaderShown = true;
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.isloaderShown = false;
        this.products = products;
        if (products.length > this.itemsPerPage )  this.isPagerShow = true;
        else this.isPagerShow = false;
      },
      (error: any) => {
        this.isloaderShown = false;

        console.error('Error retrieving products:', error);
      }
    );
  }







  deleteProduct(productId: number, indx: number): void {
    this.isProductDeleting = true;
    this.ProductDeletingId = productId;
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products.splice(indx, 1)
      this.isProductDeleting = false;
      this.ProductDeletingId = -1;
    },
      () => {
        this.isProductDeleting = false;
        this.ProductDeletingId = -1;
      }
    )
  }




  updateProduct (product: object, index: number) {
    this.openAddOrEditProductDialog({isAdd: false, product: product, index: index})
  }
  trackProductBy(_: number, product: any): number {
    return product.id;
  }

  openAddProduct(): void {
    this.openAddOrEditProductDialog({isAdd: true})

  }

  openAddOrEditProductDialog(data: object) {
    const dialogRef = this.dialog.open(UpdateAddProductComponent, {
      data: data,
      maxWidth: '800px',
      height: '45%',
      maxHeight: this.screenWidth > 768 ? '800px' : '500px',
      width: this.screenWidth > 768 ? '30%' : '90%',
      panelClass: 'full-screen-modal',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isAdd) this.products.push(result.product)
      else this.products[result.index] = result.product
    });
  }


}
