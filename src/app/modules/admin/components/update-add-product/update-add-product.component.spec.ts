import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddProductComponent } from './update-add-product.component';

describe('UpdateAddProductComponent', () => {
  let component: UpdateAddProductComponent;
  let fixture: ComponentFixture<UpdateAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAddProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
