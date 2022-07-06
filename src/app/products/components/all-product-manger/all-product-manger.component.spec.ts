import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductMangerComponent } from './all-product-manger.component';

describe('AllProductMangerComponent', () => {
  let component: AllProductMangerComponent;
  let fixture: ComponentFixture<AllProductMangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProductMangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
