import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup ,Validators} from "@angular/forms"

import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product.model';

import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface DialogData {
  isAdd: any;
  product: Product,
  index: number
}
@Component({
  selector: 'app-update-add-product',
  templateUrl: './update-add-product.component.html',
  styleUrls: ['./update-add-product.component.scss']
})
export class UpdateAddProductComponent {
  updateFrom: FormGroup = this._FormBuilder.group({
    price: ['', [Validators.required]],
    title:['',  [Validators.required]],
  });;

  products: Product[] = [];
  isProductUpdating = false;
  isProductAdd = true
  updatedProductData: any
  get getTitle(): any {return this.updateFrom!.get('title')}
  get getPrice(): any {return this.updateFrom!.get('price')}


  constructor(
    private productService: ProductService,
    private _FormBuilder : FormBuilder,
    public dialogRef: MatDialogRef<UpdateAddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  ngOnInit(): void {
    this.isProductAdd = this.data.isAdd
    if(this.isProductAdd ) {
      this.initUpdateForm({price: '', title: ''})
    } else {
      this.updatedProductData = this.data.product
      this.initUpdateForm({price: this.data.product.price, title: this.data.product.title})
    }
  }


  submitUpdate() {
    if(this.updateFrom!.valid) {
       if(this.isProductAdd) {
        this.addProduct();
       } else {
        this.updateproduct();
       }
    } else {
      this.updateFrom!.markAllAsTouched();
    }
  }
  updateproduct () {
    this.isProductUpdating = true;
    this.productService.updateProduct(this.updatedProductData.id, this.updateFrom.value).subscribe(Response => {
      this.isProductUpdating = false;
      const dataToSend = {product: {...this.updateFrom!.value,  id :this.updatedProductData.id}, index: this.data.index, isAdd: false};
      this.dialogRef.close(dataToSend);
    },() => {
        this.isProductUpdating = false;
      }
    )

  }
  initUpdateForm(data:any): void {
    this.updateFrom = this._FormBuilder.group({
      price: [data.price, [Validators.required]],
      title:[data.title,  [Validators.required]],
    });
  }
  addProduct(): void {
    this.isProductUpdating = true;
    this.productService.addProduct(this.updateFrom.value ).subscribe(() => {
      this.products.push({...this.updateFrom!.value,  id: Math.floor(Math.random() * 10000)})
      this.isProductUpdating = false;
      const dataToSend = {product: {...this.updateFrom!.value,  id: Math.floor(Math.random() * 10000)},  isAdd: true};
      this.dialogRef.close(dataToSend);
    },() => {
        this.isProductUpdating = false;
      }
    )
  }

}
