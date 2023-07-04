import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, FormControlName ,Validators} from "@angular/forms"

import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product.model';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface DialogData {
  name: string;
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

  updatedProductData: any
  isAdd = true;
  get getTitle(): any {return this.updateFrom!.get('title')}
  get getPrice(): any {return this.updateFrom!.get('price')}


  constructor(
    private productService: ProductService,
    private _FormBuilder : FormBuilder,
    public dialogRef: MatDialogRef<UpdateAddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  ngOnInit(): void {
   this.initUpdateForm()
  }


  submitUpdate() {
    if(this.updateFrom!.valid) {
       if(this.isAdd) {
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
    this.productService.updateProduct(this.updatedProductData.id, this.updatedProductData).subscribe(Response => {

      this.isProductUpdating = false;
      const dataToSend = {...this.updateFrom!.value,  id :this.updatedProductData.id};
      this.dialogRef.close(dataToSend);
      // this.modalRef!.hide();
    },
      (error: any) => {
        this.isProductUpdating = false;
        // this.modalRef!.hide();
      }
    )

  }
  initUpdateForm(): void {

    this.updateFrom = this._FormBuilder.group({
      price: ['', [Validators.required]],
      title:['',  [Validators.required]],
    });
  }
  addProduct(): void {
    debugger
    this.isProductUpdating = true;
    this.productService.addProduct(this.updateFrom.value ).subscribe(Response => {
      this.products.push({...this.updateFrom!.value,  id: Math.floor(Math.random() * 10000)})

      this.isProductUpdating = false;
      const dataToSend = {...this.updateFrom!.value,  id: Math.floor(Math.random() * 10000)};
      this.dialogRef.close(dataToSend);
    },
      (error: any) => {
        this.isProductUpdating = false;
        // this.modalRef!.hide();
      }
    )

  }

}
