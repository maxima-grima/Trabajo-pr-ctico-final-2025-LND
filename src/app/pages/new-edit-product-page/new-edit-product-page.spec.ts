import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditProductPage } from './new-edit-product-page';

describe('NewEditProductPage', () => {
  let component: NewEditProductPage;
  let fixture: ComponentFixture<NewEditProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEditProductPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEditProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
