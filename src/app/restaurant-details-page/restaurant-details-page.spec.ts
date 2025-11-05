import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDetailsPage } from './restaurant-details-page';

describe('RestaurantDetailsPage', () => {
  let component: RestaurantDetailsPage;
  let fixture: ComponentFixture<RestaurantDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
