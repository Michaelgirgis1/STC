import { Component, TemplateRef  } from '@angular/core';
import { ProductService } from '../../services/product.service'
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UpdateAddProductComponent}  from "../update-add-product/update-add-product.component"
import {FormBuilder, FormGroup, FormControlName ,Validators} from "@angular/forms"
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
  ProductDeetingId = -1;
  // modalRef?: BsModalRef;
  updatedProductData: any;
  isAdd = false;
  updateFrom: FormGroup | undefined;
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
    private fb : FormBuilder,
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


  onItemsPerPageChange(selectedValue: any) {
    this.currentPage = 1;
    this.itemsPerPage = selectedValue.label;
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


  initUpdateForm(data: any): void {

    this.updateFrom = this.fb.group({
      price: [data.price, [Validators.required]],
      title:[data.title,  [Validators.required]],
    });
  }

  get fTitle(): any {return this.updateFrom!.get('title')}
  get fPrice(): any {return this.updateFrom!.get('price')}



  deleteProduct(productId: number, indx: number): void {
    this.isProductDeleting = true;
    this.ProductDeetingId = productId;
    this.productService.deleteProduct(productId).subscribe(Response => {
      this.products.splice(indx, 1)
      this.isProductDeleting = false;
      this.ProductDeetingId = -1;
    },
      (error: any) => {
        this.isProductDeleting = false;
        this.ProductDeetingId = -1;
        console.error('Error retrieving products:', error);
      }
    )

    console.log("Delete Product", productId, indx);
  }

  openModal(template: TemplateRef<any>, data: any, isAdd:boolean) {
    this.isAdd = isAdd;
    if (isAdd) {
      this.updatedProductData  = {
        title: null,
        price: null
      }

    } else {

      this.updatedProductData = data
    }

    this.initUpdateForm(data)
    // this.modalRef = this.modalService.show(template);

  }
  // submitUpdate() {
  //   if(this.updateFrom!.valid) {
  //      if(this.isAdd) {
  //       this.addProduct();

  //      } else {
  //       this.updateproduct();
  //      }

  //   } else {
  //     this.updateFrom!.markAllAsTouched();
  //   }

  // }


  updateproduct () {
    this.isProductUpdating = true;
    this.productService.updateProduct(this.updatedProductData.id, this.updatedProductData).subscribe(Response => {
      const index =  this.products.findIndex(item => item.id === this.updatedProductData.id);
      this.products[index] = {...this.updateFrom!.value,  id :this.updatedProductData.id}
      this.isProductUpdating = false;
      // this.modalRef!.hide();
    },
      (error: any) => {
        this.isProductUpdating = false;
        // this.modalRef!.hide();
      }
    )

  }
  trackProductBy(_: number, product: any): number {
    return product.id;
  }

  openAddProduct(): void {
    const dialogRef = this.dialog.open(UpdateAddProductComponent, {
      data: {isAdd: true},
      maxWidth: '800px',
      height: '45%',
      maxHeight: '800px',
      width: this.screenWidth > 768 ? '30%' : '90%',
      panelClass: 'full-screen-modal',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.products.push(result)
      console.log('The dialog was closed');
    });
  }


}
